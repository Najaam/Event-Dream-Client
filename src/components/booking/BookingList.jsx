import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { formatCurrency, formatDateTime, getStatusClass } from '../../utils/formatters';

export function BookingList({ bookings, onCancel, cancelingId }) {
  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <Card key={booking._id} className="booking-card">
          <div className="booking-top-row">
            <div>
              <h3>{booking.eventType || 'General Event'}</h3>
              <p>{booking.venue?.name || 'Venue booking'}</p>
            </div>
            <span className={getStatusClass(booking.bookingStatus)}>{booking.bookingStatus}</span>
          </div>
          <div className="booking-details-grid">
            <div><span>Guests</span><strong>{booking.guestCount}</strong></div>
            <div><span>Start</span><strong>{formatDateTime(booking.startDateTime)}</strong></div>
            <div><span>End</span><strong>{formatDateTime(booking.endDateTime)}</strong></div>
            <div><span>Total</span><strong>{formatCurrency(booking.totalAmount)}</strong></div>
          </div>
          <div className="card-actions">
            <Button
              variant="danger"
              disabled={cancelingId === booking._id || booking.bookingStatus === 'Cancelled'}
              onClick={() => onCancel(booking._id)}
            >
              {cancelingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
