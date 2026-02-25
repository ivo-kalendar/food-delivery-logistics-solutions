import { useReducer } from 'react';
import axios from 'axios';
import KorisnikContext from './korisnikContext';
import korisnikReducer from './korisnikReducer';
import {
    CLEAR_USER,
    GET_KORISNICI,
    GET_USER,
    EDIT_USER,
    UPDATE_KORISNIK,
    ERROR_SUBMIT,
    DELETE_KORISNIK,
    CLEANUP,
} from './types';

const KorisnikState = (props) => {
    const initialState = {
        errorUpdate: null,
        korisnici: null,
        user: '',
        editKorisnik: null,
        korisnikOperation: null,
        errorKorisnik: null,
    };

    const [state, dispatch] = useReducer(korisnikReducer, initialState);

    // Get User //
    const getUser = async (id) => {
        try {
            const res = await axios.get(`/api/user/${id}`);

            dispatch({ type: GET_USER, payload: res.data });
        } catch (error) {
            dispatch({ type: CLEAR_USER, payload: error.response?.data?.msg });
        }
    };

    // Get Korisnici //
    const getKorisnici = async () => {
        try {
            const res = await axios.get('/api/allusers');

            dispatch({ type: GET_KORISNICI, payload: res.data });
        } catch (error) {
            console.log(error, 'од овде е еророт...02');
        }
    };

    // Clean Up After //
    const cleanUp = () => dispatch({ type: CLEANUP });

    // Edit Korisnik //
    const editUser = (user) => dispatch({ type: EDIT_USER, payload: user });

    // Submit User //
    const updateUser = async (korisnik) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        let { _id, ...user } = korisnik;

        try {
            const res = await axios.put(`/api/korisnik/${_id}`, user, config);

            dispatch({ type: UPDATE_KORISNIK, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR_SUBMIT, payload: err.response.data.msg });
        }
    };

    // Delete User //
    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`/api/korisnik/${id}`);

            dispatch({ type: DELETE_KORISNIK, payload: res.data });
        } catch (err) {
            dispatch({ type: ERROR_SUBMIT, payload: err.response.data.msg });
        }
    };

    // Logout //
    const clearUser = () => dispatch({ type: CLEAR_USER, payload: null });

    return (
        <KorisnikContext.Provider
            value={{
                editKorisnik: state.editKorisnik,
                user: state.user,
                korisnici: state.korisnici,
                errorKorisnik: state.errorKorisnik,
                errorUpdate: state.errorUpdate,
                korisnikOperation: state.korisnikOperation,
                deleteUser,
                editUser,
                getKorisnici,
                getUser,
                clearUser,
                updateUser,
                cleanUp,
            }}>
            {props.children}
        </KorisnikContext.Provider>
    );
};

export default KorisnikState;
