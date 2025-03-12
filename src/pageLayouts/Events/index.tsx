import { memo } from "react";
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

const Events = () => {
  const calendarEvents = [
    {
      title: "Pet Ownership Lecture",
      subtitle: "Lorem ipsum",
      start: "2025-03-08 17:00:00",
      end: "2025-03-08 19:00:00",
      location: "University of Calgary",
    },
    {
      title: "Dog Training Session",
      subtitle: "Text",
      start: "2025-03-10 07:00:00",
      end: "2025-03-10 09:00:00",
      location: "Green Park",
    },

    {
      title: "Puppy Yoga",
      subtitle: "ABC",
      start: "2025-03-15 12:00:00",
      end: "2025-03-15 14:00:00",
      location: "Location",
    },
  ];

  return (
    <div className={styles.eventspage}>
      <div className={styles.titleRow}>
        <h1>My Events</h1>
      </div>

      <hr className={styles.seperator} />

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
  <h2>Events I'm Hosting</h2>
</div>

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
</div>
  );
};

export default memo(Events);