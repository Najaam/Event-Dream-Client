import { useEffect, useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const defaultState = {
  name: '',
  description: '',
  location: '',
  capacity: '',
  pricePerHour: '',
  amenities: '',
  images: '',
  isActive: true,
};

export function VenueFormModal({ open, onClose, initialData, onSubmit, submitting }) {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        location: initialData.location || '',
        capacity: initialData.capacity || '',
        pricePerHour: initialData.pricePerHour || '',
        amenities: (initialData.amenities || []).join(', '),
        images: (initialData.images || []).join(', '),
        isActive: initialData.isActive ?? true,
      });
    } else {
      setForm(defaultState);
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: form.name,
      description: form.description,
      location: form.location,
      capacity: Number(form.capacity),
      pricePerHour: Number(form.pricePerHour),
      amenities: form.amenities
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      images: form.images
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      isActive: form.isActive,
    });
  };

  return (
    <div className="modal-overlay venue-modal-overlay">
      <Card className="modal-card modal-wide venue-modal-card">
        <div className="modal-header venue-modal-header">
          <div>
            <h3>{initialData ? 'Edit Venue' : 'Create New Venue'}</h3>
            <p>Manage venue inventory for the booking platform.</p>
          </div>

          <button type="button" className="icon-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="venue-modal-body">
          <form className="form-grid two-column venue-form-grid" onSubmit={handleSubmit}>
            <label>
              <span>Venue Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </label>

            <label>
              <span>Location</span>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </label>

            <label>
              <span>Capacity</span>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                required
              />
            </label>

            <label>
              <span>Price Per Hour</span>
              <input
                type="number"
                value={form.pricePerHour}
                onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })}
                required
              />
            </label>

            <label className="full-span">
              <span>Description</span>
              <textarea
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>

            <label className="full-span">
              <span>Amenities (comma separated)</span>
              <input
                value={form.amenities}
                onChange={(e) => setForm({ ...form, amenities: e.target.value })}
              />
            </label>

            <label className="full-span">
              <span>Image URLs (comma separated)</span>
              <input
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
              />
            </label>

            <label className="checkbox-field full-span">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              <span>Venue is active</span>
            </label>

            <div className="card-actions full-span venue-form-actions">
              <Button type="button" variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save Venue'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}