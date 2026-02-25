import { useState, useContext } from 'react';
import AuthContext from '../../context/authContext';
import ClientRegister from '../../models/ClientRegister';
import Copyright from '../layout/Copyright';

const Login = () => {
    const authContext = useContext(AuthContext);
    const { login, error, clientErr, clearErrors } = authContext;

    const [user, setUser] = useState({ ime: '', password: '' });

    let timeout;
    const startTimer = () => (timeout = setTimeout(() => clearErrors(), 5000));
    const stopTimer = () => clearTimeout(timeout);
    if (error) startTimer();

    const onChange = (e) => {
        stopTimer();
        if (error) clearErrors();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        stopTimer();
        let newUserLogin = new ClientRegister(user);

        newUserLogin
            .authenticationSendToServer()
            .then(() => login(newUserLogin.data))
            .catch((err) => clientErr(err));
    };

    return (
        <div className='form-container'>
            <h1>
                Најави <span className='text-primary'>се..</span>.
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='ime'>Корисник</label>
                    <input
                        type='text'
                        autoFocus
                        name='ime'
                        value={user.ime}
                        onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Лозинка</label>
                    <input
                        type='password'
                        name='password'
                        value={user.password}
                        onChange={onChange}
                    />
                </div>
                <input
                    type='submit'
                    value='Логирај Се'
                    className='btn btn-primary btn-block'
                />
            </form>
            <Copyright />
        </div>
    );
};

export default Login;
