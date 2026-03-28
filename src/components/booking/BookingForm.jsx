import { useMemo, useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

export function BookingForm({ venue, onSubmit, submitting, onClose }) {
  const [form, setForm] = useState({
    eventType: '',
    guestCount: '',
    startDateTime: '',
    endDateTime: '',
    specialRequirements: '',
  });

  const estimatedHours = useMemo(() => {
    if (!form.startDateTime || !form.endDateTime) return 0;
    const start = new Date(form.startDateTime).getTime();
    const end = new Date(form.endDateTime).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 0;
    return ((end - start) / (1000 * 60 * 60)).toFixed(1);
  }, [form.startDateTime, form.endDateTime]);

  const estimatedTotal = Number(estimatedHours || 0) * Number(venue?.pricePerHour || 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      venueId: venue._id,
      eventType: form.eventType,
      guestCount: Number(form.guestCount),
      startDateTime: form.startDateTime,
      endDateTime: form.endDateTime,
      specialRequirements: form.specialRequirements,
    });
  };

  return (
    <div className="modal-overlay booking-modal-overlay">
      <Card className="modal-card booking-modal-card">
        <div className="modal-header booking-modal-header">
          <div className="modal-title-wrap">
            <h3>Book {venue.name}</h3>
            <p>{venue.location}</p>
          </div>

          <button type="button" className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="booking-modal-body">
          <form className="form-grid booking-form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Event Type</span>
              <input
                type="text"
                placeholder="Wedding"
                value={form.eventType}
                onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              />
            </label>

            <label>
              <span>Guest Count</span>
              <input
                type="number"
                placeholder="250"
                value={form.guestCount}
                onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                required
              />
            </label>

            <label>
              <span>Start Date & Time</span>
              <input
                type="datetime-local"
                value={form.startDateTime}
                onChange={(e) => setForm({ ...form, startDateTime: e.target.value })}
                required
              />
            </label>

            <label>
              <span>End Date & Time</span>
              <input
                type="datetime-local"
                value={form.endDateTime}
                onChange={(e) => setForm({ ...form, endDateTime: e.target.value })}
                required
              />
            </label>

            <label className="full-span">
              <span>Special Requirements</span>
              <textarea
                rows="5"
                placeholder="Need floral decoration and separate dining area"
                value={form.specialRequirements}
                onChange={(e) =>
                  setForm({ ...form, specialRequirements: e.target.value })
                }
              />
            </label>

            <div className="booking-summary full-span">
              <div>
                <span>Hourly Price</span>
                <strong>{formatCurrency(venue.pricePerHour)}</strong>
              </div>
              <div>
                <span>Estimated Hours</span>
                <strong>{estimatedHours || 0}</strong>
              </div>
              <div>
                <span>Estimated Total</span>
                <strong>{formatCurrency(estimatedTotal)}</strong>
              </div>
            </div>

            <div className="card-actions full-span booking-form-actions">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Booking Request'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}