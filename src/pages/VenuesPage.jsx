import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { SectionHeader } from '../components/common/SectionHeader';
import { VenueCard } from '../components/venue/VenueCard';
import { BookingForm } from '../components/booking/BookingForm';
import { venueService } from '../services/venueService';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

export function VenuesPage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const loadVenues = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await venueService.getAll();
      setVenues(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const handleBookClick = (venue) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (user?.role !== 'User') {
      setError('Only User accounts can create booking requests.');
      return;
    }
    setSelectedVenue(venue);
  };

  const handleBookingSubmit = async (payload) => {
    setSubmitting(true);
    try {
      await bookingService.create(payload);
      setSelectedVenue(null);
      navigate('/user/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <section className="page-section container">
        <SectionHeader
          eyebrow="Venue catalogue"
          title="Browse active venues"
          subtitle="Public venue discovery with direct booking flow for authenticated users."
        />

        {error ? <div className="alert alert-error">{error}</div> : null}
        {loading ? <Loader label="Fetching venues..." /> : null}

        {!loading && venues.length === 0 ? <EmptyState title="No venues found" subtitle="Ask the admin to add venue inventory first." /> : null}

        <div className="venue-grid">
          {venues.map((venue) => (
            <VenueCard key={venue._id} venue={venue} onBook={handleBookClick} />
          ))}
        </div>
      </section>

      {selectedVenue ? (
        <BookingForm
          venue={selectedVenue}
          onSubmit={handleBookingSubmit}
          submitting={submitting}
          onClose={() => setSelectedVenue(null)}
        />
      ) : null}
    </AppLayout>
  );
}
