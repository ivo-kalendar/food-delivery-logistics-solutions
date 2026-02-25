import { useReducer } from 'react';
import axios from 'axios';
import TablesContext from './tablesContext';
import tablesReducer from './tablesReducer';
import {
    ADD_DRIVERS,
    BACK_FROM_DELETE_SCREEN,
    CHECK_ACTIVE_DRIVERS,
    CLEAR_EDIT_TABLE,
    CLEAR_TABLES,
    CREATE_NEW_TABLE,
    DELETE_TABLE,
    GET_ALL_TABLES,
    GET_COMMENT_OPTIONS,
    GET_EDIT_TABLE,
    GET_HOUR_OPTIONS,
    GET_KOMERCIAL_OPTIONS,
    GO_TO_DELETE_SCREEN,
    POST_TABLE_COMMENT,
    PUT_DISTRIBUTOR_VALUES,
    REMOVE_DRIVERS,
    SELECTED_TABLE,
    TABLE_ERROR,
} from './types';

const TablesState = (props) => {
    const initialState = {
        hour: [],
        komentar: [],
        komercija: [],
        activeDistributors: [],
        inActiveDistributors: [],
        selectedTable: null,
        editTable: null,
        allTables: null,
        tableError: null,
        tableOperation: null,
    };

    const [state, dispatch] = useReducer(tablesReducer, initialState);

    // Get All Hour Options //
    const getHourOptions = async () => {
        try {
            const res = await axios.get('/api/options/hour');

            dispatch({ type: GET_HOUR_OPTIONS, payload: res.data.hour });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data?.msg || err,
            });
        }
    };

    // Get All Comment Options //
    const getCommentOptions = async () => {
        try {
            const res = await axios.get('/api/options/comment');

            dispatch({ type: GET_COMMENT_OPTIONS, payload: res.data.komentar });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data?.msg || err,
            });
        }
    };

    // Get All Komercijal and Reon Options //
    const getKomercialOptions = async () => {
        try {
            const res = await axios.get('/api/options/komercial');

            dispatch({
                type: GET_KOMERCIAL_OPTIONS,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data?.msg || err,
            });
        }
    };

    // Get All Tables Data //
    const getAllTablesData = async () => {
        try {
            const res = await axios.get('/api/tables/users');

            dispatch({ type: GET_ALL_TABLES, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data?.msg || err,
            });
        }
    };

    // Get All Tables //
    const getAllTables = async () => {
        try {
            const res = await axios.get('/api/tables');
            getAllTablesData();

            dispatch({ type: GET_ALL_TABLES, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data?.msg || err,
            });
        }
    };

    // Set Selected Table and fetch data //
    const getSelectedTable = async (tableID) => {
        try {
            const res = await axios.get(`/api/table/${tableID}`);

            dispatch({ type: SELECTED_TABLE, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Get selected to edit screen //
    const getEditTable = async (tableID) => {
        try {
            const res = await axios.get(`/api/table/${tableID}`);

            dispatch({ type: GET_EDIT_TABLE, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Delete and Clear Decisions Screen //
    const goToDeleteScreen = () => dispatch({ type: GO_TO_DELETE_SCREEN });
    const backFromDelete = () => dispatch({ type: BACK_FROM_DELETE_SCREEN });
    const clearEditTable = () => dispatch({ type: CLEAR_EDIT_TABLE });

    // Clear Everything //
    const clearTables = () => dispatch({ type: CLEAR_TABLES });

    // Delete table //
    const deleteTable = async (tableID) => {
        try {
            const res = await axios.delete(`/api/deletetable/${tableID}`);

            dispatch({ type: DELETE_TABLE, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Update Table with distributor values //
    const updateTable = async (tableID, distributorID, field, value) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const table = { distributorID, field, value };

        try {
            const res = await axios.put(
                `/api/updatetable/${tableID}`,
                table,
                config
            );
            const getRes = await axios.get(`/api/table/${res.data}`);

            dispatch({ type: PUT_DISTRIBUTOR_VALUES, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Create New Table with all active distributors //
    const createNewTable = async (author) => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const table = { author };

        try {
            const res = await axios.post('/api/table/new', table, config);
            const getRes = await axios.get(`/api/table/${res.data._id}`);

            dispatch({ type: CREATE_NEW_TABLE, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response.data.msg,
            });
        }
    };

    // add table comment //
    const addTableComment = async (id, comment) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.put(
                `/api/table-comment/${id}`,
                { comment },
                config
            );
            const getRes = await axios.get(`/api/table/${res.data._id}`);

            dispatch({ type: POST_TABLE_COMMENT, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response.data.msg,
            });
        }
    };

    // Copy and Create New Table with all active distributors //
    const copyToNewTable = async (author, tableID) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.post(
                '/api/copytable/new',
                { author, tableID },
                config
            );
            const getRes = await axios.get(`/api/table/${res.data._id}`);

            dispatch({ type: CREATE_NEW_TABLE, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response.data.msg,
            });
        }
    };

    // Check for more active or inactive distributors //
    const checkActiveDistributors = async (tableID) => {
        try {
            const res = await axios.get(`/api/options/drivers/${tableID}`);

            dispatch({ type: CHECK_ACTIVE_DRIVERS, payload: res.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Remove Inactive drivers //
    const removeDrivers = async (tableID, drivers) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.put(
                `/api/table/removedrivers/${tableID}`,
                { drivers },
                config
            );
            const getRes = await axios.get(`/api/table/${res.data}`);

            dispatch({ type: REMOVE_DRIVERS, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Fill Table with all Active Drivers //
    const addDrivers = async (tableID, drivers) => {
        const config = { headers: { 'Content-Type': 'application/json' } };

        try {
            const res = await axios.put(
                `/api/table/adddrivers/${tableID}`,
                { drivers },
                config
            );
            const getRes = await axios.get(`/api/table/${res.data}`);

            dispatch({ type: ADD_DRIVERS, payload: getRes.data });
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    // Remove All Comments from Table //
    const removeTableComments = async (tableID) => {
        try {
            await axios.put(`/api/table/removecomments/${tableID}`);
        } catch (err) {
            dispatch({
                type: TABLE_ERROR,
                payload: err.response?.data.msg || err,
            });
        }
    };

    return (
        <TablesContext.Provider
            value={{
                hour: state.hour,
                editTable: state.editTable,
                allTables: state.allTables,
                selectedTable: state.selectedTable,
                tableError: state.tableError,
                tableOperation: state.tableOperation,
                komentar: state.komentar,
                komercija: state.komercija,
                activeDistributors: state.activeDistributors,
                inActiveDistributors: state.inActiveDistributors,
                removeTableComments,
                removeDrivers,
                addDrivers,
                getHourOptions,
                getSelectedTable,
                createNewTable,
                getAllTables,
                getEditTable,
                clearTables,
                goToDeleteScreen,
                backFromDelete,
                deleteTable,
                copyToNewTable,
                clearEditTable,
                updateTable,
                getKomercialOptions,
                getCommentOptions,
                checkActiveDistributors,
                addTableComment,
            }}>
            {props.children}
        </TablesContext.Provider>
    );
};

export default TablesState;
