import { Button } from '../common/Button';
import { formatCurrency, formatDateTime, getStatusClass } from '../../utils/formatters';

export function BookingTable({ bookings, onUpdateStatus, loadingId }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Venue</th>
            <th>Event</th>
            <th>Guests</th>
            <th>Timeline</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.user?.fullName || '—'}</td>
              <td>{booking.venue?.name || '—'}</td>
              <td>{booking.eventType || 'General Event'}</td>
              <td>{booking.guestCount}</td>
              <td>
                <div className="stacked-text">
                  <span>{formatDateTime(booking.startDateTime)}</span>
                  <span>{formatDateTime(booking.endDateTime)}</span>
                </div>
              </td>
              <td><span className={getStatusClass(booking.bookingStatus)}>{booking.bookingStatus}</span></td>
              <td>{formatCurrency(booking.totalAmount)}</td>
              <td>
                <div className="table-actions">
                  <Button
                    variant="secondary"
                    disabled={loadingId === booking._id || booking.bookingStatus !== 'Pending'}
                    onClick={() => onUpdateStatus(booking._id, 'Approved')}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    disabled={loadingId === booking._id || booking.bookingStatus !== 'Pending'}
                    onClick={() => onUpdateStatus(booking._id, 'Rejected')}
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
