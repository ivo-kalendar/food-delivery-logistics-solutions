import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import KorisnikContext from '../../context/korisnikContext';
import EventsContext from '../../context/eventsContext';
import TableRoutes from '../links/TableRoutes';

const Table = () => {
    const eventsContext = useContext(EventsContext);
    const korisnikContext = useContext(KorisnikContext);
    const {
        user: { adminApproved },
    } = korisnikContext;
    const { scrollDown } = eventsContext;

    return adminApproved ? (
        <>
            <div className={`navbar list-links${scrollDown}`}>
                <ul className='list' style={{ flexWrap: 'wrap' }}>
                    <li style={{ padding: '.5em 1em' }}>
                        <NavLink end to='/table/firstroute'>
                            Прва Рута
                        </NavLink>
                    </li>
                    <li style={{ padding: '.5em 1em' }}>
                        <NavLink end to='/table/secondroute'>
                            Втора Рута
                        </NavLink>
                    </li>
                </ul>
            </div>
            <TableRoutes />
            <div className='empty'></div>
        </>
    ) : (
        <h2
            style={{ fontWeight: '100' }}
            className='text-secondary text-center'>
            Побарајте пристап од Администраторот...
        </h2>
    );
};

export default Table;
