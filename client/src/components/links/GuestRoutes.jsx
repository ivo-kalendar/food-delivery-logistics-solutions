import { Routes, Route, Navigate } from 'react-router-dom'; // Тргнат Redirect и Switch, додадени Routes и Navigate
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from '../pages/About';

const GuestRoutes = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                
                <Route path='*' element={<Navigate to='/login' replace />} />
            </Routes>
        </div>
    );
};

export default GuestRoutes;