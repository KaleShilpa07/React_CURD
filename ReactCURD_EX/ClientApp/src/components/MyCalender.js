import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class MyCalendar extends React.Component {
    state = {
        events: [],
        showEventForm: false,
        newEvent: {
            title: '',
            start: '',
            end: ''
        }
    };

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = async () => {
        try {
            const response = await fetch('https://localhost:7195/api/home/GetEvents');
            const responseData = await response.text();
            console.log('Response Data:', responseData); // Log response data
            // ...rest of the code
        } catch (error) {
            console.error('Error fetching events:', error);
            this.setState({ error: 'Failed to fetch events' });
        }
    };

    handleEventFormToggle = () => {
        this.setState(prevState => ({
            showEventForm: !prevState.showEventForm
        }));
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                [name]: value
            }
        }));
    };

    handleEventSubmit = async () => {
        try {
            const response = await fetch('https://localhost:7195/api/home/GetEvents1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.newEvent)
            });
            const data = await response.json();
            this.setState(prevState => ({
                events: [...prevState.events, data],
                showEventForm: false,
                newEvent: {
                    title: '',
                    start: '',
                    end: ''
                }
            }));
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    render() {
        return (
            <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
                
                <button onClick={this.handleEventFormToggle} type="submit" className="btn btn-primary mr-2 mt-2 ml-4 mb-2" >Add Event</button>

                {this.state.showEventForm && (
                    <form onSubmit={this.handleEventSubmit} className="mt-4">
                        <div className="row">
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Event title"
                                    value={this.state.newEvent.title}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="start"
                                    value={this.state.newEvent.start}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="end"
                                    value={this.state.newEvent.end}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary">Create Event</button>
                            </div>
                        </div>
                    </form>
                )}
                <hr/>
                {/*<Calendar*/}
                {/*    localizer={localizer}*/}
                {/*    events={this.state.events}*/}
                {/*    startAccessor="start"*/}
                {/*    endAccessor="end"*/}
                {/*    style={{ height: 500 }}*/}
                {/*/>*/}
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    views={['month', 'week', 'day', 'agenda']} // Ensure 'agenda' view is included
                    defaultView="month"
                    defaultDate={new Date()}
                    style={{ height: 500 }}
                />
                </div>
            
        );
    }
}

export default MyCalendar;
