import { memo, useState, useMemo } from "react";
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
  const maxOccurrences = 52; 

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
  const [searchQuery, setSearchQuery] = useState('');
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

  const [joinedEvents, setJoinedEvents] = useState<Event[]>([{
    title: "Cat Adoption Event",
    subtitle: "Adopt a cat",
    start: "2025-04-06T14:00:00",
    location: "Animal Shelter",
    id: "Cat Adoption Event-0"
  }]);

  const allEvents = useMemo(() => [
    ...calendarEvents.flatMap(event => generateRecurringEvents(event)),
    ...joinedEvents.flatMap(event => generateRecurringEvents(event))
  ], [calendarEvents, joinedEvents]);

  const upcomingEvents = getUpcomingEvents(allEvents);
  const hostedEvents = calendarEvents.filter(event => !event.isRecurring);

  const searchableEvents: Event[] = [
    {
      title: "Bird Watching",
      subtitle: "Watch birds in their natural habitat",
      start: "2025-04-10T08:00:00",
      location: "Nature Reserve",
      id: "Bird Watching-0"
    },
    {
      title: "Pet Grooming Workshop",
      subtitle: "Learn how to groom your pet",
      start: "2025-04-12T10:00:00",
      location: "Community Center",
      id: "Pet Grooming Workshop-0"
    },
    {
      title: "Animal Shelter Volunteer Day",
      subtitle: "Help out at the local shelter",
      start: "2025-04-15T09:00:00",
      location: "City Animal Shelter",
      id: "Animal Shelter Volunteer Day-0"
    }
  ];

  const filteredEvents = searchQuery 
  ? searchableEvents.filter(event => 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

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

  const handleJoinEvent = (eventToJoin: Event) => {
    if (!joinedEvents.some(e => e.id === eventToJoin.id)) {
      setJoinedEvents([...joinedEvents, eventToJoin]);
    }
    setSearchQuery('');
  };

  return (
    
    <div className={styles.eventspage}>
      <div className={styles.headerRow}>
        <h1>My Events</h1>
        <button className={styles.addEventButton} onClick={handleOpenForm}>
          New Event
        </button>
      </div>

      <div className={styles.searchBarContainer}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery && (
        <>
          <div className={styles.titleRow}>
            <h2>Search Results</h2>
          </div>
          <hr className={styles.separator} />
          <div className={styles.searchResults}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div key={event.id || index} className={styles.searchResultCard}>
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.subtitle}</p>
                    <p>{new Date(event.start).toLocaleString()} @ {event.location}</p>
                  </div>
                  <button 
                    className={styles.joinButton}
                    onClick={() => handleJoinEvent(event)}
                  >
                    Join
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                No events found matching "{searchQuery}"
              </div>
            )}
          </div>
          <hr className={styles.separator} />
        </>
      )}

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