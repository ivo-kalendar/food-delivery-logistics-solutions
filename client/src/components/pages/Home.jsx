import { useContext } from 'react';
import KorisnikContext from '../../context/korisnikContext';
import SelectedTable from '../layout/SelectedTable';

const Home = () => {
    const korisnikContext = useContext(KorisnikContext);
    const {
        user: { adminApproved },
    } = korisnikContext;

    return adminApproved ? (
        <SelectedTable />
    ) : (
        <h2
            style={{ fontWeight: '100' }}
            className='text-secondary text-center'>
            Побарајте пристап од Администраторот...
        </h2>
    );
};

export default Home;
