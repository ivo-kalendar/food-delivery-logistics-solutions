import { useState, useContext } from 'react';
import AuthContext from '../../context/authContext';
import ClientRegister from '../../models/ClientRegister';
import Copyright from '../layout/Copyright';

const Register = () => {
    const authContext = useContext(AuthContext);
    let { register, error, clientErr, clearErrors } = authContext;

    const [user, setUser] = useState({ ime: '', password: '', password2: '' });

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
        let newUserRegister = new ClientRegister(user);

        newUserRegister
            .registrationSendToServer()
            .then(() => register(newUserRegister.data))
            .catch((err) => clientErr(err));
    };

    return (
        <div className='form-container'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='ime'>
                        <p>Корисничко Име</p>
                    </label>
                    <input
                        type='text'
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
                <div className='form-group'>
                    <label htmlFor='password2'>Потврди Лозинка</label>
                    <input
                        type='password'
                        name='password2'
                        value={user.password2}
                        onChange={onChange}
                    />
                </div>
                <input
                    type='submit'
                    value='Регистрирај се...'
                    className='btn btn-primary btn-block'
                />
            </form>
            <Copyright />
        </div>
    );
};

export default Register;
