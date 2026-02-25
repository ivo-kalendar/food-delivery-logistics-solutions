import { useContext } from 'react';
import moment from 'moment';
import 'moment/dist/locale/mk';

import KorisnikContext from '../../context/korisnikContext';
import Spinner from '../layout/Spinner';

const UserProfile = () => {
    const korisnikContext = useContext(KorisnikContext);
    const { user } = korisnikContext;

    return (
        <div>
            {!user ? (
                <Spinner />
            ) : user.ime !== 'admin' ? (
                <div className='container'>
                    <h1>Немате пристап до оваа страна</h1>
                </div>
            ) : (
                <div>
                    <p>
                        <span className='text-secondary'>_id: </span>
                        {user._id}
                    </p>
                    <h1>
                        <span className='text-secondary lead'>име: </span>
                        {user.ime}
                    </h1>
                    <p>
                        <span className='text-secondary'>позиција: </span>
                        {user.pozicija}
                    </p>
                    {!user.date ? (
                        <></>
                    ) : (
                        <p>
                            <span className='text-secondary'>
                                профил креиран на{' '}
                            </span>
                            {moment(user.date)
                                .locale('mk')
                                .format('Do MMMM YYYYгод. dddd')}
                            <span className='text-secondary'> во </span>
                            {moment(user.date).locale('mk').format('HH:mm:ss')}
                            <span className='text-secondary'> часот.</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
