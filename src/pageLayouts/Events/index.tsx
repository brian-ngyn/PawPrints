import { memo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import styles from './index.module.scss';
import EventForm from '../../components/Events/EventForm';

interface Event {
  title: string;
  subtitle: string;
  start: string;
  location: string;
  isRecurring?: boolean;
  recurrencePattern?: 'weekly' | 'biweekly' | 'monthly';
  recurrenceEnd?: string;
  id?: string;
}

const generateRecurringEvents = (baseEvent: Event): Event[] => {
  if (!baseEvent.isRecurring || !baseEvent.recurrencePattern) {
    return [{ ...baseEvent, id: baseEvent.title + "-0" }];
  }

  const events: Event[] = [];
  const startDate = new Date(baseEvent.start);
  const endDate = baseEvent.recurrenceEnd ? new Date(baseEvent.recurrenceEnd) : null;
  const maxOccurrences = 52; // Safety limit

  for (let i = 0; i < maxOccurrences; i++) {
    const eventDate = new Date(startDate);
    
    switch (baseEvent.recurrencePattern) {
      case 'weekly':
        eventDate.setDate(eventDate.getDate() + (i * 7));
        break;
      case 'biweekly':
        eventDate.setDate(eventDate.getDate() + (i * 14));
        break;
      case 'monthly':
        eventDate.setMonth(eventDate.getMonth() + i);
        break;
    }

    if (endDate && eventDate > endDate) break;

    events.push({
      ...baseEvent,
      start: eventDate.toISOString(),
      id: `${baseEvent.title}-${i}`
    });
  }

  return events;
};

const getUpcomingEvents = (events: Event[]) => {
  const today = new Date();
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
      start: "2025-03-08T17:00:00",
      location: "University of Calgary",
      id: "Pet Ownership Lecture-0"
    },
    {
      title: "Dog Training Session",
      subtitle: "Text",
      start: "2025-03-10T07:00:00",
      location: "Green Park",
      id: "Dog Training Session-0"
    },
    {
      title: "Puppy Yoga",
      subtitle: "ABC",
      start: "2025-03-15T12:00:00",
      location: "Location",
      id: "Puppy Yoga-0"
    },
  ]);

  const joinedEvents: Event[] = [{
    title: "Cat Adoption Event",
    subtitle: "Adopt a cat",
    start: "2025-04-06T14:00:00",
    location: "Animal Shelter",
    id: "Cat Adoption Event-0"
  }];

  const allEvents = [
    ...calendarEvents.flatMap(event => generateRecurringEvents(event)),
    ...joinedEvents.flatMap(event => generateRecurringEvents(event))
  ];

  const upcomingEvents = getUpcomingEvents(allEvents);
  const hostedEvents = calendarEvents.filter(event => !event.isRecurring);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleCreateEvent = (newEvent: Event) => {
    const generatedEvents = generateRecurringEvents(newEvent);
    setCalendarEvents([...calendarEvents, ...generatedEvents.filter(e => e.id?.endsWith("-0"))]);
    setShowForm(false);
  };

  return (
    <div className={styles.eventspage}>
      <div className={styles.headerRow}>
        <h1>My Events</h1>
        <button className={styles.addEventButton} onClick={handleOpenForm}>
          New Event
        </button>
      </div>

      <hr className={styles.separator} />

      <div className={styles.row}>
        <div className={styles.calendarContainer}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={allEvents}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={(eventInfo) => (
              <div className={eventInfo.event.extendedProps.isRecurring ? styles.recurringEvent : ''}>
                <b>{eventInfo.event.title}</b>
                <p>{eventInfo.event.extendedProps.location}</p>
                {eventInfo.event.extendedProps.isRecurring && (
                  <span className={styles.recurringBadge}></span>
                )}
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
            <div key={event.id || index} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
              <p>{new Date(event.start).toLocaleString()} @ {event.location}</p>
              {event.isRecurring && <span className={styles.recurringBadge}>Recurring</span>}
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
          {hostedEvents.map((event, index) => (
            <div key={event.id || index} className={styles.eventCard}>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
              <p>{new Date(event.start).toLocaleString()} @ {event.location}</p>
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