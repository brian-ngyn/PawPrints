import { useState } from 'react';
import styles from './index.module.scss';

interface Event {
  title: string;
  subtitle: string;
  start: string;
  location: string;
  type:
    | 'educational'
    | 'community'
    | 'expo'
    | 'social'
    | 'training'
    | 'fundraiser'
    | 'volunteer'
    | 'adoption'
    | 'wildlife';
  isRecurring?: boolean;
  recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
  recurrenceEnd?: string;
  id?: string;
}

interface EventFormProps {
  onClose: () => void;
  onSubmit: (event: Event) => void;
  eventToEdit?: Event | null;
}

const EventForm = ({ onClose, onSubmit, eventToEdit }: EventFormProps) => {
  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(eventToEdit?.subtitle || '');
  const [start, setStart] = useState(eventToEdit?.start || '');
  const [location, setLocation] = useState(eventToEdit?.location || '');
  const [isRecurring, setIsRecurring] = useState(
    eventToEdit?.isRecurring || false,
  );
  const [recurrencePattern, setRecurrencePattern] = useState<
    Event['recurrencePattern']
  >(eventToEdit?.recurrencePattern || 'weekly');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      title,
      subtitle,
      start,
      location,
      type,
      ...(isRecurring && {
        isRecurring: true,
        recurrencePattern,
      }),
    };
    onSubmit(newEvent);
    onClose();
  };

  const [type, setType] = useState<Event['type']>(
    eventToEdit?.type || 'educational',
  );

  return (
    <div className={styles.eventFormOverlay}>
      <div className={styles.eventForm}>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Event['type'])}
              required
            >
              <option value="educational">Educational</option>
              <option value="community">Community</option>
              <option value="expo">Expo</option>
              <option value="training">Social</option>
              <option value="fundraiser">Fundraiser</option>
              <option value="volunteer">Volunteer</option>
              <option value="adoption">Adoption</option>
              <option value="wildlife">Wildlife</option>
            </select>
          </div>

          <div className={styles.recurrenceGroup}>
            <label className={styles.recurrenceToggle}>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              <span>Recurring Event</span>
            </label>

            {isRecurring && (
              <div className={styles.recurrenceOptions}>
                <label>Repeat every:</label>
                <select
                  value={recurrencePattern}
                  onChange={(e) =>
                    setRecurrencePattern(
                      e.target.value as Event['recurrencePattern'],
                    )
                  }
                >
                  <option value="weekly">Week</option>
                  <option value="biweekly">2 Weeks</option>
                  <option value="monthly">Month</option>
                </select>
              </div>
            )}
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
