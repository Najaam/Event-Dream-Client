import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { SectionHeader } from '../components/common/SectionHeader';
import { Loader } from '../components/common/Loader';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { StatCard } from '../components/common/StatCard';
import { BookingList } from '../components/booking/BookingList';
import { bookingService } from '../services/bookingService';

export function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState('');
  const [error, setError] = useState('');

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await bookingService.getMine();
      setBookings(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const stats = useMemo(() => {
    const pending = bookings.filter((item) => item.bookingStatus === 'Pending').length;
    const approved = bookings.filter((item) => item.bookingStatus === 'Approved').length;
    const cancelled = bookings.filter((item) => item.bookingStatus === 'Cancelled').length;
    return { pending, approved, cancelled };
  }, [bookings]);

  const handleCancel = async (id) => {
    setCancelingId(id);
    try {
      await bookingService.cancelMine(id);
      await loadBookings();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelingId('');
    }
  };

  return (
    <AppLayout>
      <section className="page-section container">
        <SectionHeader
          eyebrow="User workspace"
          title="My bookings"
          subtitle="Track pending requests, approved reservations, and cancellations."
          action={<Link to="/venues"><Button>Book a Venue</Button></Link>}
        />

        {error ? <div className="alert alert-error">{error}</div> : null}

        <div className="stats-grid">
          <StatCard label="Total Bookings" value={bookings.length} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Approved" value={stats.approved} />
          <StatCard label="Cancelled" value={stats.cancelled} />
        </div>

        {loading ? <Loader label="Loading your bookings..." /> : null}

        {!loading && bookings.length === 0 ? (
          <EmptyState title="No bookings yet" subtitle="Browse venues and submit your first booking request." />
        ) : null}

        {!loading && bookings.length > 0 ? (
          <BookingList bookings={bookings} onCancel={handleCancel} cancelingId={cancelingId} />
        ) : null}
      </section>
    </AppLayout>
  );
}
