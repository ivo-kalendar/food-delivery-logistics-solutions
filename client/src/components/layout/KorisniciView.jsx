import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import KorisnikContext from '../../context/korisnikContext';
import CardList from './CardList';
import Spinner from './Spinner';

const KorisniciView = () => {
    const korisnikContext = useContext(KorisnikContext);
    const { korisnici, getKorisnici, editUser } = korisnikContext;

    useEffect(() => {
        getKorisnici();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {korisnici !== null ? (
                <>
                    <div className='origin'>
                        вкупно {korisnici.length} Корисници
                    </div>
                    {korisnici.map((user) => (
                        <Link
                            className='card-list'
                            key={user._id}
                            to='/profile/edit'
                            onClick={() => editUser(user)}>
                            <CardList user={user} />
                        </Link>
                    ))}
                </>
            ) : (
                <>
                    <Spinner />
                    <Spinner />
                    <Spinner />
                </>
            )}
        </>
    );
};

export default KorisniciView;
