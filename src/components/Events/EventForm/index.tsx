import { useState } from "react";
import styles from './index.module.scss'; 

interface Event {
  title: string;
  subtitle: string;
  start: string;
  location: string;
}

interface EventFormProps {
  onClose: () => void;
  onSubmit: (event: Event) => void;
}

const EventForm = ({ onClose, onSubmit }: EventFormProps) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [start, setStart] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      title,
      subtitle,
      start,
      location,
    };
    onSubmit(newEvent); 
    onClose(); 
  };

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

export default EventForm