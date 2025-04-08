import { memo, useState, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from './index.module.scss';
import EventForm from '../../components/Events/EventForm';
import EventPopup from '../../components/Events/EventPopup';
import PlusIcon from '../../components/PlusIcon';

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

const generateRecurringEvents = (baseEvent: Event): Event[] => {
  if (!baseEvent.isRecurring || !baseEvent.recurrencePattern) {
    return [{ ...baseEvent, id: `${baseEvent.title}-0` }];
  }

  const events: Event[] = [];
  const startDate = new Date(baseEvent.start);
  const endDate = baseEvent.recurrenceEnd
    ? new Date(baseEvent.recurrenceEnd)
    : null;
  const maxOccurrences = 52;

  for (let i = 0; i < maxOccurrences; i++) {
    const eventDate = new Date(startDate);

    switch (baseEvent.recurrencePattern) {
      case 'weekly':
        eventDate.setDate(eventDate.getDate() + i * 7);
        break;
      case 'biweekly':
        eventDate.setDate(eventDate.getDate() + i * 14);
        break;
      case 'monthly':
        eventDate.setMonth(eventDate.getMonth() + i);
        break;
    }

    if (endDate && eventDate > endDate) break;

    events.push({
      ...baseEvent,
      start: eventDate.toISOString(),
      id: `${baseEvent.title}-${i}`,
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
  const [popup, setPopup] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([
    {
      title: 'Pet Ownership Lecture',
      subtitle: 'Come and learn about certain aspects of pet ownership',
      start: '2025-04-23T17:00:00',
      location: 'University',
      type: 'educational',
      id: 'Pet Ownership Lecture-0',
    },
    {
      title: 'Low-Cost Pet Vaccination Day',
      subtitle: 'Protect your pet with affordable shots',
      start: '2025-04-29T12:00:00',
      location: 'City Animal Shelter',
      type: 'community',
      id: 'Pet Vaccination Day-0',
    },
  ]);

  const [joinedEvents, setJoinedEvents] = useState<Event[]>([
    {
      title: 'Cat Adoption Event',
      subtitle: 'Find your new furry best friend',
      start: '2025-04-14T14:00:00',
      location: 'Animal Shelter',
      type: 'social',
      id: 'Cat Adoption Event-0',
    },
  ]);

  const searchableEvents: Event[] = [
    {
      title: 'Bird Watching',
      subtitle: 'Watch birds in their natural habitat',
      start: '2025-04-10T08:00:00',
      location: 'Nature Reserve',
      type: 'wildlife',
      id: 'Bird Watching-0',
    },
    {
      title: 'Pet Grooming Workshop',
      subtitle: 'Learn how to groom your pet',
      start: '2025-04-12T10:00:00',
      location: 'Community Center',
      type: 'training',
      id: 'Pet Grooming Workshop-0',
    },
    {
      title: 'Animal Shelter Volunteer Day',
      subtitle: 'Help out at the local shelter',
      start: '2025-04-15T09:00:00',
      location: 'City Animal Shelter',
      type: 'volunteer',
      id: 'Animal Shelter Volunteer Day-0',
    },
    {
      title: 'Pet First Aid Workshop',
      subtitle: 'Learn how to care for your pet in emergencies',
      start: '2025-04-20T14:00:00',
      location: 'Community Vet Center',
      type: 'educational',
      id: 'Pet First Aid-Workshop-0',
    },
    {
      title: 'Dog Training Basics',
      subtitle: 'Learn dog training basics, obedience training session',
      start: '2025-04-18T16:00:00',
      location: 'East Downtown Dog Park',
      type: 'training',
      id: 'Dog Training Basics-0',
    },
    {
      title: 'Paws & Claws Charity Gala',
      subtitle: 'Support local animal rescues',
      start: '2025-04-17T18:30:00',
      location: 'Downtown Event Hall',
      type: 'fundraiser',
      id: 'Paws & Claws Charity Gala-0',
    },
  ];

  const allEvents = useMemo(
    () => [
      ...calendarEvents.flatMap((event) => generateRecurringEvents(event)),
      ...joinedEvents.flatMap((event) => generateRecurringEvents(event)),
      ...searchableEvents.flatMap((event) => generateRecurringEvents(event)),
    ],
    [calendarEvents, joinedEvents],
  );

  const myUpcomingEvents = joinedEvents;

  const normalizeEventId = (event: Event): string => {
    if (event.isRecurring) {
      return event.id?.endsWith('-0') ? event.id : `${event.title}-0`;
    }
    return event.id || `${event.title}-${Date.now()}`;
  };

  const hostedEvents = calendarEvents.filter(
    (event) => !event.isRecurring || event.id?.endsWith('-0'),
  );

  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    if (!searchQuery && typeFilter === 'all') {
      return allEvents;
    } else {
      return allEvents.filter((event) => {
        const isInTitle =
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase());
        const isInType = typeFilter === 'all' || event.type === typeFilter;

        return isInTitle && isInType;
      });
    }
  }, [searchQuery, typeFilter, allEvents]);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCreateEvent = (newEvent: Event) => {
    const eventWithId = {
      ...newEvent,
      id: normalizeEventId(newEvent),
    };
    const generatedEvents = generateRecurringEvents(eventWithId);
    setCalendarEvents([
      ...calendarEvents,
      ...generatedEvents.filter((e) => e.id?.endsWith('-0')),
    ]);
    setShowForm(false);
  };

  const handleJoinEvent = async (eventToJoin: Event | undefined) => {
    if (eventToJoin) {
      const confirmed = await confirmWithPopup(
        `Would you like to join "${eventToJoin.title}"?`,
      );

      if (confirmed && !joinedEvents.some((e) => e.id === eventToJoin.id)) {
        setJoinedEvents([...joinedEvents, eventToJoin]);
      }

      setSearchQuery('');
    }
  };

  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
    setShowForm(true);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    if (!eventToEdit) return;

    const finalEvent = {
      ...updatedEvent,
      id: normalizeEventId(updatedEvent),
    };

    setCalendarEvents(
      calendarEvents.map((event) =>
        event.id === eventToEdit.id ? finalEvent : event,
      ),
    );
    setShowForm(false);
    setEventToEdit(null);
  };

  const handleDeleteEvent = async (eventId: string, isRecurring?: boolean) => {
    const message = isRecurring
      ? 'This is a recurring event. This will delete all occurrences!'
      : 'Are you sure you want to delete this event?';

    const confirmed = await confirmWithPopup(message);
    if (!confirmed) return;

    if (isRecurring) {
      const baseId = eventId.split('-')[0];
      setCalendarEvents(
        calendarEvents.filter((event) => !event.id?.startsWith(baseId)),
      );
      setJoinedEvents(
        joinedEvents.filter((event) => !event.id?.startsWith(baseId)),
      );
    } else {
      setCalendarEvents(calendarEvents.filter((event) => event.id !== eventId));
      setJoinedEvents(joinedEvents.filter((event) => event.id !== eventId));
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    const confirmed = await confirmWithPopup(
      'Are you sure you want to leave this event?',
    );
    if (!confirmed) return;

    setJoinedEvents(joinedEvents.filter((event) => event.id !== eventId));
  };

  const confirmWithPopup = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setPopup({
        message,
        onConfirm: () => {
          setPopup(null);
          resolve(true);
        },
        onCancel: () => {
          setPopup(null);
          resolve(false);
        },
      });
    });
  };

  return (
    <div className={styles.eventspage}>
      <div className={styles.headerRow}>
        <h1>My Events</h1>
        <div className={styles.newEventButton} onClick={handleOpenForm}>
          <PlusIcon width={25} height={25} colour={'#454545'} />
          <div className={styles.newEventText}>New Event</div>
        </div>
        {/* <button className={styles.addEventButton} onClick={handleOpenForm}>
          New Event
        </button> */}
      </div>

      <div className={styles.filterControls}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className={styles.typeFilter}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Event Types</option>
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

      {searchQuery && (
        <>
          <div className={styles.titleRow}>
            <h2>Search Results</h2>
          </div>
          <hr className={styles.separator} />
          <div className={styles.searchResults}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className={styles.searchResultCard}
                >
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.subtitle}</p>
                    <p>
                      {new Date(event.start).toLocaleString()} @{' '}
                      {event.location}
                    </p>
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
            events={filteredEvents}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            eventContent={(eventInfo) => (
              <div
                className={
                  eventInfo.event.extendedProps.isRecurring
                    ? styles.recurringEvent
                    : ''
                }
                style={{ color: 'black', cursor: 'pointer' }}
                onClick={() =>
                  handleJoinEvent(
                    allEvents.find((e) => e.id === eventInfo.event.id),
                  )
                }
              >
                <b>{eventInfo.event.title}</b>
                <p>{eventInfo.event.extendedProps.location}</p>
              </div>
            )}
          />
        </div>
      </div>

      <div className={styles.titleRow}>
        <h2>My Upcoming Events</h2>
      </div>

      <hr className={styles.separator} />

      <div className={styles.eventsListContainer}>
        <div className={styles.eventsList}>
          {myUpcomingEvents.map((event, index) => (
            <div key={event.id || index} className={styles.eventCard}>
              <div className={styles.eventHeader}>
                <h3>{event.title}</h3>
                <span className={styles.eventTypeBadge}>{event.type}</span>
              </div>
              <p className={styles.eventSubtitle}>{event.subtitle}</p>
              <p className={styles.eventDate}>
                {new Date(event.start).toLocaleString()}
              </p>
              <p className={styles.eventLocation}>@ {event.location}</p>
              {event.isRecurring && (
                <div className={styles.recurrenceInfo}>
                  <span className={styles.recurringBadge}>
                    ↻ Repeats {event.recurrencePattern}
                  </span>
                  {event.recurrenceEnd && (
                    <span className={styles.recurrenceEnd}>
                      until {new Date(event.recurrenceEnd).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
              <div className={styles.eventActions}>
                {calendarEvents.some((e) => e.id === event.id) && (
                  <>
                    <button
                      className={styles.editButton}
                      onClick={() => handleLeaveEvent(event.id)}
                    >
                      Leave
                    </button>
                  </>
                )}
                {!calendarEvents.some((e) => e.id === event.id) &&
                  joinedEvents.some((e) => e.id === event.id) && (
                    <button
                      className={styles.leaveButton}
                      onClick={() => event.id && handleLeaveEvent(event.id)}
                    >
                      Leave
                    </button>
                  )}
              </div>
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
            <div
              key={event.id || index}
              className={styles.eventCard}
              data-recurring={event.isRecurring ? 'true' : 'false'}
            >
              <div className={styles.eventHeader}>
                <h3>{event.title}</h3>
                <span className={styles.eventTypeBadge}>{event.type}</span>
              </div>
              <p className={styles.eventSubtitle}>{event.subtitle}</p>
              <p className={styles.eventDate}>
                {new Date(event.start).toLocaleString()}
              </p>
              <p className={styles.eventLocation}>@ {event.location}</p>

              {event.isRecurring && (
                <div className={styles.recurrenceInfo}>
                  <span className={styles.recurringBadge}>
                    ↻ Repeats {event.recurrencePattern}
                  </span>
                  {event.recurrenceEnd && (
                    <span className={styles.recurrenceEnd}>
                      until {new Date(event.recurrenceEnd).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}

              <div className={styles.eventActions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditEvent(event)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    event.id && handleDeleteEvent(event.id, event.isRecurring)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <EventForm
          onClose={() => {
            setShowForm(false);
            setEventToEdit(null);
          }}
          onSubmit={eventToEdit ? handleUpdateEvent : handleCreateEvent}
          eventToEdit={eventToEdit}
        />
      )}

      {popup && (
        <EventPopup
          content={popup.message}
          onConfirm={popup.onConfirm}
          onCancel={popup.onCancel}
        />
      )}
    </div>
  );
};

export default memo(Events);
