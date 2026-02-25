import { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';
import AuthContext from '../../context/authContext';
import KorisnikContext from '../../context/korisnikContext';
import TablesContext from '../../context/tablesContext';
import moment from 'moment';
import 'moment/dist/locale/mk';
import Spinner2 from './Spinner2';
import TableDelete from './TableDelete';
import SelectedItem from './SelectedItem';

const SelectedTable = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        // content: () => componentRef.current,
        contentRef: componentRef,
    });
    const tablesContext = useContext(TablesContext);
    const authContext = useContext(AuthContext);
    const korisnikContext = useContext(KorisnikContext);
    const navigate = useNavigate();
    const { userID } = authContext;
    const { user } = korisnikContext;
    const {
        getAllTables,
        copyToNewTable,
        backFromDelete,
        tableOperation,
        editTable,
        selectedTable,
        getEditTable,
        allTables,
        goToDeleteScreen,
        getSelectedTable,
    } = tablesContext;
    const [ifLastDocument, setIfLastDocument] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [waitToRefresh, setWaitToRefresh] = useState(false);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!allTables) setIfLastDocument(true);
        if (
            allTables &&
            selectedTable &&
            allTables[0]._id !== selectedTable._id
        ) {
            setIfLastDocument(false);
        }
        if (
            allTables &&
            selectedTable &&
            allTables[0]._id === selectedTable._id
        ) {
            setIfLastDocument(true);
        }
        // eslint-disable-next-line
    }, [selectedTable, allTables, editTable]);

    useEffect(() => {
        if (tableOperation === 'table deleted') {
            getAllTables();
            setTimeout(() => {
                navigate('/table');
                backFromDelete();
                getSelectedTable();
            }, 1000);
        }
        // eslint-disable-next-line
    }, [tableOperation]);

    useEffect(() => {
        if (waiting) {
            navigate('/table/edit');
            getAllTables();
        }
        // eslint-disable-next-line
    }, [editTable]);

    const newTable = async () => {
        setWaiting(true);
        await copyToNewTable(userID, selectedTable._id);
        getSelectedTable();
    };

    const refresh = async () => {
        setWaitToRefresh(true);
        await getAllTables();
        await getSelectedTable();
        setWaitToRefresh(false);
    };

    let today, sledenRabotenDen, denes, sega, denesnaData;
    if (selectedTable) {
        today = moment(selectedTable.date).locale('mk').format('DD.MM.YYYY');
        denesnaData = moment().locale('mk').format('DD.MM.YYYY');
        denes = moment(selectedTable.date).locale('mk').format('dddd');
        sega = moment(new Date()).locale('mk').format('dddd');
        let utre = moment(selectedTable.date)
            .add(1, 'days')
            .locale('mk')
            .format('dddd');

        denes = denes.charAt(0).toLocaleUpperCase() + denes.slice(1);
        sega = sega.charAt(0).toLocaleUpperCase() + sega.slice(1);
        sledenRabotenDen = utre.charAt(0).toLocaleUpperCase() + utre.slice(1);
        if (denes === 'Петок' || denes === 'Сабота') {
            sledenRabotenDen = 'Понеделник';
        }
    }

    return tableOperation === 'delete' ? (
        <TableDelete />
    ) : (
        <>
            <div className='origin'>
                {ifLastDocument ? (
                    selectedTable ? (
                        <span>
                            вкупно {selectedTable?.tableData?.length}{' '}
                            дистрибутери
                        </span>
                    ) : null
                ) : (
                    <span className='text-danger border-danger'>
                        има понов распоред
                    </span>
                )}
            </div>
            {tableOperation === 'table deleted' ? (
                <h3
                    className='text-success'
                    style={{
                        border: '3px solid #28a745',
                        padding: '1rem',
                        margin: '1rem',
                    }}>
                    Табелата е успешно избришана!
                </h3>
            ) : (
                <div className='btns-group'>
                    {user.ime === 'admin' ? (
                        <Link onClick={() => goToDeleteScreen()} to='#'>
                            <div className='btn btn-danger badge table-btn'>
                                избриши
                                <p> </p>
                            </div>
                        </Link>
                    ) : null}
                    {selectedTable &&
                    selectedTable.author === userID &&
                    sega === denes &&
                    today === denesnaData ? (
                        <Link
                            onClick={() => {
                                setWaiting(true);
                                getEditTable(selectedTable._id);
                            }}
                            to='#'>
                            <div className='btn btn-dark badge table-btn'>
                                {!waiting ? 'промени' : <Spinner2 />}
                            </div>
                        </Link>
                    ) : (
                        <Link onClick={newTable} to='#'>
                            <div className='btn btn-success badge table-btn'>
                                {!waiting ? 'превземи' : <Spinner2 />}
                            </div>
                        </Link>
                    )}
                    <Link onClick={refresh} to='#'>
                        <div className='btn btn-primary badge table-btn'>
                            {!waitToRefresh ? 'освежи' : <Spinner2 />}
                        </div>
                    </Link>
                    <Link onClick={handlePrint} to='#'>
                        <div className='btn btn-purple badge table-btn'>
                            принти
                        </div>
                    </Link>
                </div>
            )}
            <div className='empty'></div>
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    <ComponentToPrint />
                </div>
            </div>
            <div className='table'>
                <div className='space-between'>
                    {selectedTable ? (
                        <>
                            <p>
                                {denes} {today}
                            </p>
                            <p>
                                {selectedTable.name || selectedTable.ime}{' '}
                                {selectedTable.surname}
                            </p>
                        </>
                    ) : null}
                </div>
                <h2 className='table-title'>
                    Распоред за {selectedTable ? sledenRabotenDen : null}
                </h2>
                <div className='table-header'>
                    <div className='table-header-info'>
                        <h3>име презиме</h3>
                        <h3>h</h3>
                        <h3>реон / комерција / план / град / возило</h3>
                    </div>
                    <h3 className='table-header-comment'>Коментар</h3>
                </div>

                {selectedTable ? (
                    <>
                        {selectedTable.tableArr.map((d) => (
                            <SelectedItem key={d._id} distributor={d} />
                        ))}
                        {selectedTable.tableComment && (
                            <div className='table-user-comment'>
                                {selectedTable.tableComment}
                            </div>
                        )}
                    </>
                ) : (
                    <Spinner2 />
                )}
                <div style={{ margin: '0.2rem' }}></div>
            </div>
            <div className='empty'></div>
        </>
    );
};

export default SelectedTable;
