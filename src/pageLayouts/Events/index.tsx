import { memo, useState } from "react";
/**
 * This page uses FullCalendar, a third-party library for displaying and managing events.
 * FullCalendar is licensed under the MIT License.
 * Website: https://fullcalendar.io/
 * GitHub: https://github.com/fullcalendar/fullcalendar
 */
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from './index.module.scss'; 
import EventForm from '../../components/Events/EventForm'

interface Event {
  title: string;
  subtitle: string;
  start: string;
  location: string;
}

const getUpcomingEvents = (events: Event[]) => {
  const today = new Date(); // Current date
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7); 

  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return eventDate >= today && eventDate <= nextWeek; 
  });
};

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([
    {
      title: "Pet Ownership Lecture",
      subtitle: "Lorem ipsum",
      start: "2025-03-08 17:00:00",
      location: "University of Calgary",
    },
    {
      title: "Dog Training Session",
      subtitle: "Text",
      start: "2025-03-10 07:00:00",
      location: "Green Park",
    },
    {
      title: "Puppy Yoga",
      subtitle: "ABC",
      start: "2025-03-15 12:00:00",
      location: "Location",
    },

  ]);

  const joinedEvents: Event[] = [{
    title: "Cat Adoption Event",
    subtitle: "Adopt a cat",
    start: "2025-03-14 14:00:00",
    location: "Animal Shelter"
  }]

  const allEvents = [...calendarEvents, ...joinedEvents];

  const upcomingEvents = getUpcomingEvents(allEvents);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCreateEvent = (newEvent: Event) => {
    setCalendarEvents([...calendarEvents, newEvent]);
    setShowForm(false);
  };

  return (
    <div className={styles.eventspage}>
      <div className={styles.headerRow}>
        <h1>My Events</h1>
        <button className={styles.addEventButton} onClick={handleOpenForm}>
          +
        </button>
      </div>

      <hr className={styles.separator} />

      <div className={styles.row}>
        <div className={styles.calendarContainer}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={(eventInfo) => (
              <div>
                <b>{eventInfo.event.title}</b>
                <p>{eventInfo.event.extendedProps.location}</p>
              </div>
            )}
          />
        </div>
      </div>

      <div className={styles.titleRow}>
        <h2>Upcoming Events</h2>
      </div>

      <hr className={styles.separator} />

      <div className={styles.eventsListContainer}>
        <div className={styles.eventsList}>
          {upcomingEvents.map((event, index) => (
            <div key={index} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
              <p>{event.start} @ {event.location}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.titleRow}>
        <h2>Events I'm Hosting</h2>
      </div>

      <hr className={styles.separator} />

      <div className={styles.eventsListContainer}>
        <div className={styles.eventsList}>
          {calendarEvents.map((event, index) => (
            <div key={index} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
              <p>{event.start} @ {event.location}</p>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <EventForm onClose={handleCloseForm} onSubmit={handleCreateEvent} />
      )}
    </div>
  );
};

export default memo(Events);