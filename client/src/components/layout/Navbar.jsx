import { useContext } from 'react';
import EventsContext from '../../context/eventsContext';
import Scroll from '../events/Scroll';
import GuestLinks from '../links/GuestLinks';
import UserLinks from '../links/UserLinks';

const Navbar = ({ userID, errors }) => {
    const eventsContext = useContext(EventsContext);
    const { scrollDown } = eventsContext;

    return (
        <>
            <Scroll />
            {errors ? (
                <div className='navbar-alert'>
                    <ul>
                        {errors.map((err, i) => (
                            <li key={`error ${i}`} className='alert'>
                                {err}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                    <div
                        className={`navbar ${
                            scrollDown ? 'navbar-scroll-down' : ''
                        }`}>
                        {!userID ? <GuestLinks /> : <UserLinks />}
                    </div>
                    <div className='empty'></div>
                </>
            )}
        </>
    );
};

export default Navbar;
