import { useEffect, useContext } from 'react';
import EventsContext from '../../context/eventsContext';

const Scroll = () => {
    const eventsContext = useContext(EventsContext);
    const { scrollDown, handleScrollDown } = eventsContext;

    useEffect(() => {
        window.addEventListener('scroll', handleScrollDown);

        // cleanup this component
        return () => {
            window.removeEventListener('scroll', handleScrollDown);
        };
        // eslint-disable-next-line
    }, [scrollDown]);

    return <></>;
};

export default Scroll;
