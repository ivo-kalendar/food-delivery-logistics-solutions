import { useReducer } from 'react';
import axios from 'axios';
import VraboteniContext from './vraboteniContext';
import vraboteniReducer from './vraboteniReducer';
import {
    CLEANUP_WORKER,
    CREATE_WORKER,
    DELETE_VRABOTEN,
    EDIT_WORKER,
    ERROR_SUBMIT_VRABOTEN,
    GET_VRABOTENI,
    UPDATE_VRABOTEN,
} from './types';

const VraboteniState = (props) => {
    const initialState = {
        editVraboten: null,
        vraboteni: null,
        errorUpdateVraboten: null,
        vrabotenOperation: null,
        errorVraboten: null,
    };

    const [state, dispatch] = useReducer(vraboteniReducer, initialState);

    // Get Vraboteni //
    const getVraboteni = async () => {
        try {
            const res = await axios.get('/api/vraboteni');

            dispatch({ type: GET_VRABOTENI, payload: res.data });
        } catch (error) {
            console.log(error, 'од овде е еророт...04');
        }
    };

    // Clean Up After //
    const cleanUpWorker = () => dispatch({ type: CLEANUP_WORKER });

    // Edit Vraboten //
    const editWorker = (worker) =>
        dispatch({ type: EDIT_WORKER, payload: worker });

    // Submit Worker //
    const updateWorker = async (vraboten) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        let { _id, ...worker } = vraboten;

        try {
            const res = await axios.put(`/api/vraboten/${_id}`, worker, config);

            dispatch({ type: UPDATE_VRABOTEN, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR_SUBMIT_VRABOTEN,
                payload: err.response.data.msg,
            });
        }
    };

    // Delete Worker //
    const deleteWorker = async (id) => {
        try {
            const res = await axios.delete(`/api/vraboten/${id}`);

            dispatch({ type: DELETE_VRABOTEN, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR_SUBMIT_VRABOTEN,
                payload: err.response.data.msg,
            });
        }
    };

    // Create Worker //
    const createNewWorker = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const worker = { ime: '' };

        try {
            const res = await axios.post('/api/vraboten/nov', worker, config);

            dispatch({ type: CREATE_WORKER, payload: res.data });
        } catch (err) {
            dispatch({
                type: ERROR_SUBMIT_VRABOTEN,
                payload: err.response.data.msg,
            });
        }
    };

    return (
        <VraboteniContext.Provider
            value={{
                vraboteni: state.vraboteni,
                editVraboten: state.editVraboten,
                errorUpdateVraboten: state.errorUpdateVraboten,
                vrabotenOperation: state.vrabotenOperation,
                errorVraboten: state.errorVraboten,
                getVraboteni,
                editWorker,
                cleanUpWorker,
                updateWorker,
                deleteWorker,
                createNewWorker,
            }}>
            {props.children}
        </VraboteniContext.Provider>
    );
};

export default VraboteniState;
