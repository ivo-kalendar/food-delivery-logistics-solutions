import { useContext } from 'react';
import EventsContext from '../../context/eventsContext';
import { NavLink } from 'react-router-dom';
import ListsRoutes from '../links/ListsRoutes';

const Lists = () => {
    const eventsContext = useContext(EventsContext);
    const { scrollDown } = eventsContext;

    return (
        <>
            <div className={`navbar list-links${scrollDown}`}>
                <ul className='list' style={{ flexWrap: 'wrap' }}>
                    <li style={{ padding: '.5em 1em' }}>
                        <NavLink end to='/lists/korisnici'>
                            Корисници
                        </NavLink>
                    </li>
                    <li style={{ padding: '.5em 1em' }}>
                        <NavLink end to='/lists/vraboteni'>
                            Вработени
                        </NavLink>
                    </li>
                </ul>
            </div>
            <ListsRoutes />
        </>
    );
};

export default Lists;
