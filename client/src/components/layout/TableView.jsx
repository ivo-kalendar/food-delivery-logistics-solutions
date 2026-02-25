import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import TablesContext from '../../context/tablesContext';
import AuthContext from '../../context/authContext';
import Spinner from './Spinner';
import Spinner2 from './Spinner2';
import TableCard from './TableCard';

const TableView = () => {
    const navigate = useNavigate();
    const tablesContext = useContext(TablesContext);
    const authContext = useContext(AuthContext);
    const {
        allTables,
        selectedTable,
        createNewTable,
        editTable,
        getAllTables,
        getSelectedTable,
    } = tablesContext;
    const { userID } = authContext;
    const [waiting, setWaiting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nextTable, setNextTable] = useState(null);

    useEffect(() => {
        if (!allTables) getAllTables();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (waiting && editTable) navigate('/table/edit');
        // eslint-disable-next-line
    }, [waiting, editTable]);

    useEffect(() => {
        setNextTable(selectedTable);
        if (loading && nextTable) navigate('/home');
        // eslint-disable-next-line
    }, [selectedTable, nextTable]);

    const newTable = async () => {
        setWaiting(true);
        await createNewTable(userID);
        getSelectedTable();
        getAllTables();
    };

    return (
        <>
            {allTables ? (
                <>
                    <div className='origin'>
                        вкупно {allTables.length} табели
                    </div>
                    <Link
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.6rem',
                        }}
                        onClick={newTable}
                        className='table-card'
                        to='#'>
                        {waiting ? <Spinner2 /> : <p>Нова Табела!</p>}
                    </Link>
                    {allTables.map((table) => (
                        <Link
                            onClick={() => {
                                getSelectedTable(table._id);
                                setLoading(table._id);
                            }}
                            className={`table-card ${
                                selectedTable && selectedTable._id === table._id
                                    ? 'selected-table-card'
                                    : ''
                            }`}
                            to='#'
                            key={table._id}>
                            {loading === table._id ? (
                                <>
                                    <p style={{ marginBottom: '2rem' }}>
                                        ...почекајте
                                    </p>
                                    <Spinner2 />
                                </>
                            ) : (
                                <TableCard table={table} />
                            )}
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

export default TableView;
