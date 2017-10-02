import React, { Component } from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.scss';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
Calendar.momentLocalizer(moment); // or globalizeLocalizer

class FullCalendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          title: 'All Day Event',
          allDay: true,
          start: new Date(2015, 3, 0),
          end: new Date(2015, 3, 1),
        },
        {
          title: 'Long Event',
          start: new Date(2015, 3, 7),
          end: new Date(2015, 3, 10),
        },

        {
          title: 'DTS STARTS',
          start: new Date(2016, 2, 13, 0, 0, 0),
          end: new Date(2016, 2, 20, 0, 0, 0),
        },

        {
          title: 'DTS ENDS',
          start: new Date(2016, 10, 6, 0, 0, 0),
          end: new Date(2016, 10, 13, 0, 0, 0),
        },

        {
          title: 'Some Event',
          start: new Date(2015, 3, 9, 0, 0, 0),
          end: new Date(2015, 3, 9, 0, 0, 0),
        },
        {
          title: 'Conference',
          start: new Date(2015, 3, 11),
          end: new Date(2015, 3, 13),
          desc: 'Big conference for important people',
        },
        {
          title: 'Meeting',
          start: new Date(2015, 3, 12, 10, 30, 0, 0),
          end: new Date(2015, 3, 12, 12, 30, 0, 0),
          desc: 'Pre-meeting meeting, to prepare for the meeting',
        },
        {
          title: 'Lunch',
          start: new Date(2015, 3, 12, 12, 0, 0, 0),
          end: new Date(2015, 3, 12, 13, 0, 0, 0),
          desc: 'Power lunch',
        },
        {
          title: 'Meeting',
          start: new Date(2015, 3, 12, 14, 0, 0, 0),
          end: new Date(2015, 3, 12, 15, 0, 0, 0),
        },
        {
          title: 'Happy Hour',
          start: new Date(2015, 3, 12, 17, 0, 0, 0),
          end: new Date(2015, 3, 12, 17, 30, 0, 0),
          desc: 'Most important meal of the day',
        },
        {
          title: 'Dinner',
          start: new Date(2015, 3, 12, 20, 0, 0, 0),
          end: new Date(2015, 3, 12, 21, 0, 0, 0),
        },
        {
          title: 'Birthday Party',
          start: new Date(2015, 3, 13, 7, 0, 0),
          end: new Date(2015, 3, 13, 10, 30, 0),
        },
      ],
    };
  }

  onSelectEvent = (event) => {
    alert(event.title);
  };

  onSelectSlot = (slotInfo) => {
    alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} \nend: ${slotInfo.end.toLocaleString()}`);
  };

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render() {
    const { events } = this.state;
    return (
      <div className="full-calendar">
        <Calendar
          popup
          selectable
          events={events}
          defaultDate={new Date(2015, 3, 1)}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.onSelectSlot}
          onEventDrop={this.moveEvent}
        />
      </div>
    );
  }
}

export default FullCalendar;
