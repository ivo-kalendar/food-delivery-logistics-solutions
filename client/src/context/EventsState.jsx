import { useReducer } from 'react';
import EventsContext from './eventsContext';
import eventsReducer from './eventsReducer';
import { SCROLLED_DOWN, SCROLLED_UP } from './types';

const EventsState = (props) => {
    const initialState = {
        scrollDown: '',
    };

    const [state, dispatch] = useReducer(eventsReducer, initialState);

    let position = 0;
    const handleScrollDown = (event) => {
        if (
            state.scrollDown !== '-scrolled-down' &&
            window.pageYOffset > position &&
            position > window.innerHeight / 4
        ) {
            dispatch({ type: SCROLLED_DOWN });
        }
        if (
            state.scrollDown === '-scrolled-down' &&
            window.pageYOffset < position
        ) {
            dispatch({ type: SCROLLED_UP });
        }
        position = window.pageYOffset;
    };

    return (
        <EventsContext.Provider
            value={{
                scrollDown: state.scrollDown,
                handleScrollDown,
            }}>
            {props.children}
        </EventsContext.Provider>
    );
};

export default EventsState;
