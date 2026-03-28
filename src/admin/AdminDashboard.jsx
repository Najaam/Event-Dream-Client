import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import { StatCard } from '../components/common/StatCard';
import { VenueCard } from '../components/venue/VenueCard';
import { VenueFormModal } from '../components/admin/VenueFormModal';
import { BookingTable } from '../components/admin/BookingTable';
import { venueService } from '../services/venueService';
import { bookingService } from '../services/bookingService';

export function AdminDashboard() {
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [venueModalOpen, setVenueModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [savingVenue, setSavingVenue] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState('');

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [venueResponse, bookingResponse] = await Promise.all([
        venueService.getAll(),
        bookingService.getAll(),
      ]);
      setVenues(venueResponse.data || []);
      setBookings(bookingResponse.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const stats = useMemo(() => ({
    venues: venues.length,
    bookings: bookings.length,
    pending: bookings.filter((item) => item.bookingStatus === 'Pending').length,
    approved: bookings.filter((item) => item.bookingStatus === 'Approved').length,
  }), [venues, bookings]);

  const handleSaveVenue = async (payload) => {
    setSavingVenue(true);
    try {
      if (selectedVenue?._id) {
        await venueService.update(selectedVenue._id, payload);
      } else {
        await venueService.create(payload);
      }
      setVenueModalOpen(false);
      setSelectedVenue(null);
      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingVenue(false);
    }
  };

  const handleDeleteVenue = async (id) => {
    try {
      await venueService.remove(id);
      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setUpdatingBookingId(id);
    try {
      await bookingService.updateStatus(id, status);
      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingBookingId('');
    }
  };

  return (
    <AppLayout>
      <section className="page-section container">
        <SectionHeader
          eyebrow="Admin workspace"
          title="Venue and booking management"
          subtitle="Manage venue inventory and review all booking requests from one dashboard."
          action={<Button onClick={() => { setSelectedVenue(null); setVenueModalOpen(true); }}>Add Venue</Button>}
        />

        {error ? <div className="alert alert-error">{error}</div> : null}

        <div className="stats-grid">
          <StatCard label="Active Venues" value={stats.venues} />
          <StatCard label="Total Bookings" value={stats.bookings} />
          <StatCard label="Pending Requests" value={stats.pending} />
          <StatCard label="Approved Requests" value={stats.approved} />
        </div>

        {loading ? <Loader label="Loading admin workspace..." /> : null}

        {!loading ? (
          <>
            <SectionHeader title="Venue inventory" subtitle="Create, update, and remove venues." />
            <div className="venue-grid">
              {venues.map((venue) => (
                <VenueCard
                  key={venue._id}
                  venue={venue}
                  adminMode
                  onEdit={(venueItem) => {
                    setSelectedVenue(venueItem);
                    setVenueModalOpen(true);
                  }}
                  onDelete={handleDeleteVenue}
                />
              ))}
            </div>

            <SectionHeader title="Booking requests" subtitle="Approve or reject user booking submissions." />
            <BookingTable bookings={bookings} onUpdateStatus={handleUpdateStatus} loadingId={updatingBookingId} />
          </>
        ) : null}
      </section>

      <VenueFormModal
        open={venueModalOpen}
        onClose={() => { setVenueModalOpen(false); setSelectedVenue(null); }}
        initialData={selectedVenue}
        onSubmit={handleSaveVenue}
        submitting={savingVenue}
      />
    </AppLayout>
  );
}
