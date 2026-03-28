import { MapPin, Users, Wallet } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export function VenueCard({ venue, onBook, adminMode = false, onEdit, onDelete }) {
  return (
    <Card className="venue-card">
      <div className="venue-image-wrap">
        <img
          src={venue.images?.[0] || 'https://placehold.co/800x500?text=Venue'}
          alt={venue.name}
        />
      </div>

      <div className="venue-card-body">
        <div className="venue-card-top">
          <div>
            <h3>{venue.name}</h3>
            <p>{venue.description || 'Elegant venue for weddings, corporate events, and celebrations.'}</p>
          </div>
          <span className={`status-pill ${venue.isActive === false ? 'status-rejected' : 'status-approved'}`}>
            {venue.isActive === false ? 'Inactive' : 'Active'}
          </span>
        </div>

        <div className="venue-meta">
          <span><MapPin size={16} /> {venue.location}</span>
          <span><Users size={16} /> Capacity: {venue.capacity}</span>
          <span><Wallet size={16} /> {formatCurrency(venue.pricePerHour)}/hr</span>
        </div>

        <div className="tag-list">
          {(venue.amenities || []).map((item) => (
            <span key={item} className="tag">{item}</span>
          ))}
        </div>

        <div className="card-actions">
          {adminMode ? (
            <>
              <Button variant="secondary" onClick={() => onEdit(venue)}>Edit Venue</Button>
              <Button variant="danger" onClick={() => onDelete(venue._id)}>Delete</Button>
            </>
          ) : (
            <Button onClick={() => onBook(venue)}>Book This Venue</Button>
          )}
        </div>
      </div>
    </Card>
  );
}
