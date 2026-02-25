import { useReducer } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../utils/setAuthToken';
import {
    REGISTER_USER,
    LOGIN_FAIL,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    LOGOUT,
    USER_LOADED,
    LOGIN_SUCCESS,
    DECODED_TOKEN,
} from './types';

const AuthState = (props) => {
    const initialState = {
        error: null,
        token: localStorage.getItem('token'),
        decoded: null,
        userID: false,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // get Token Payload Info
    const decodedToken = () => {
        if (localStorage.token) {
            try {
                let decodedPayload = jwtDecode(localStorage.token);
                dispatch({ type: DECODED_TOKEN, payload: decodedPayload });
            } catch (error) {
                dispatch({ type: LOGOUT });
            }
        }
    };

    // Logout user if the token is expired
    const checkExpiredToken = () => {
        const presentTime = new Date().getTime();

        if (
            localStorage.token &&
            state.decoded &&
            state.decoded.exp * 1000 < presentTime
        ) {
            dispatch({ type: LOGOUT });
        }
    };

    // Authenticate User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            decodedToken();
        }

        try {
            dispatch({ type: USER_LOADED });
        } catch (err) {
            dispatch({ type: LOGIN_FAIL });
        }
    };

    // Register User
    const register = async (formData) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.post('/api/register', formData, config);

            dispatch({ type: REGISTER_USER, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data });
        }
    };

    // Login User
    const login = async (formData) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.post('/api/login', formData, config);

            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data });
        }
    };

    // Check for client Errors on registration before send to server
    const clientErr = (err) => dispatch({ type: REGISTER_FAIL, payload: err });

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                decoded: state.decoded,
                userID: state.userID,
                token: state.token,
                error: state.error,
                loadUser,
                register,
                login,
                logout,
                clientErr,
                clearErrors,
                checkExpiredToken,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
