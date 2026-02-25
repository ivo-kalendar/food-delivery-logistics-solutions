import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Copyright from '../layout/Copyright';

const Logout = () => {
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    return (
        <div>
            <p className='text-secondary p-2' style={{ textAlign: 'center' }}>
                Дали си сигурен дека сакаш да се одјавиш?
            </p>
            <ul
                className='grid-2'
                style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                <li>
                    <NavLink onClick={logout} end to='/'>
                        Да
                    </NavLink>
                </li>
                <li>
                    <NavLink end to='/'>
                        Не
                    </NavLink>
                </li>
            </ul>
            <Copyright />
        </div>
    );
};

export default Logout;
