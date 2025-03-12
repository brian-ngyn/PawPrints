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
      title: "dog walk",
      subtitle: "walk dog",
      start: "2025-03-08T17:00:00",
      end: "2025-03-08T1:00:00",
      location: "uofc",
    },
    {
      title: "feed dog",
      subtitle: "eat",
      start: "2025-03-10T07:00:00",
      end: "2025-03-10T08:00:00",
      location: "calgary",
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
            events={calendarEvents} // Pass the event data
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