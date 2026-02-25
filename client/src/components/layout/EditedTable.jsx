import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/dist/locale/mk';
import TableContext from '../../context/tablesContext';
import EditTableString from './EditTableString';
import Spinner2 from './Spinner2';
import TableString from './TableString';

const EditedTable = () => {
    const tableContext = useContext(TableContext);
    const {
        checkActiveDistributors,
        removeTableComments,
        selectedTable,
        getSelectedTable,
        getEditTable,
        getHourOptions,
        getCommentOptions,
        getKomercialOptions,
        removeDrivers,
        addDrivers,
        editTable,
        clearEditTable,
        activeDistributors,
        inActiveDistributors,
        addTableComment,
    } = tableContext;
    const [id, setId] = useState(null);
    const [msg, setMsg] = useState('...');
    const [drive, setDrive] = useState('drive-short');
    const [waitingActive, setWaitingActive] = useState(false);
    const [waitingInactive, setWaitingInactive] = useState(false);
    const [waitingComments, setWaitingComments] = useState(false);
    const [userComment, setUserComment] = useState('Додај Коментар');

    useEffect(() => {
        if (id) {
            setMsg(
                '...изберете опција за да извршите промена...   ...доколку сакате да изберете повеќе од една опција повторно кликнете на истото поле...'
            );
            setDrive('drive-long');
        }
        if (!id) {
            setMsg(
                'Кликнете на некое од полињата во табелата на кое сакате да извршите промена...'
            );
            setDrive('drive-short');
        }
        // eslint-disable-next-line
    }, [id, msg]);

    useEffect(() => {
        if (editTable) {
            setUserComment(
                editTable.tableComment && editTable.tablecomment !== ''
                    ? editTable.tableComment
                    : 'Додај Коментар'
            );
            checkActiveDistributors(editTable._id);
        }
        getHourOptions();
        getCommentOptions();
        getKomercialOptions();
        return () => clearEditTable();
        // eslint-disable-next-line
    }, []);

    const removeInactiveDrivers = async () => {
        setWaitingInactive(true);
        await removeDrivers(editTable._id, inActiveDistributors);
        await getSelectedTable(selectedTable._id);
        await getEditTable(selectedTable._id);
        checkActiveDistributors(editTable._id);
    };

    const removeAllComments = async () => {
        setWaitingComments(true);
        await removeTableComments(selectedTable._id);
        await getSelectedTable(selectedTable._id);
        await getEditTable(selectedTable._id);
        checkActiveDistributors(editTable._id);
        setWaitingComments(false);
    };

    const addActiveDrivers = async () => {
        setWaitingActive(true);
        await addDrivers(editTable._id, activeDistributors);
        await getSelectedTable(selectedTable._id);
        await getEditTable(selectedTable._id);
        checkActiveDistributors(editTable._id);
    };

    let sledenRabotenDen, denes;
    if (editTable) {
        denes = moment(editTable.date).locale('mk').format('dddd');
        let utre = moment(editTable.date)
            .add(1, 'days')
            .locale('mk')
            .format('dddd');
        denes = denes.charAt(0).toLocaleUpperCase() + denes.slice(1);
        sledenRabotenDen = utre.charAt(0).toLocaleUpperCase() + utre.slice(1);
        if (denes === 'Петок' || denes === 'Сабота') {
            sledenRabotenDen = 'Понеделник';
        }
    }

    return !editTable ? (
        <h2
            style={{ fontWeight: '100' }}
            className='text-secondary text-center'>
            Нема ништо за промена...
        </h2>
    ) : (
        <>
            <div className='origin'>
                <div className='drive'>
                    <div className={`drive-left ${drive}`}>{msg}</div>
                </div>
            </div>

            <div className='btns-group'>
                {inActiveDistributors.length ? (
                    <Link onClick={removeInactiveDrivers} to='#'>
                        <div className='btn btn-danger badge table-btn'>
                            {!waitingInactive ? (
                                <>
                                    отстрани ги
                                    <p className='small-letters'>
                                        неактивните дистрибутери
                                    </p>
                                </>
                            ) : (
                                <Spinner2 />
                            )}
                        </div>
                    </Link>
                ) : null}

                {activeDistributors.length ? (
                    <Link onClick={addActiveDrivers} to='#'>
                        <div className='btn btn-success badge table-btn'>
                            {!waitingActive ? (
                                <>
                                    дополни
                                    <p className='small-letters'>
                                        со активни дистрибутери
                                    </p>
                                </>
                            ) : (
                                <Spinner2 />
                            )}
                        </div>
                    </Link>
                ) : null}

                <Link onClick={removeAllComments} to='#'>
                    <div className='btn btn-primary badge table-btn'>
                        {!waitingComments ? (
                            <>
                                избриши ги
                                <p className='small-letters'>сите коментари</p>
                            </>
                        ) : (
                            <Spinner2 />
                        )}
                    </div>
                </Link>
            </div>

            <div className='empty'></div>
            <div className='table'>
                <div style={{ margin: '0.2rem' }}></div>
                <h2 className='table-title'>
                    План за {editTable ? sledenRabotenDen : null}
                </h2>
                <div className='table-header'>
                    <div className='table-header-info'>
                        <h3>име презиме</h3>
                        <h3>h</h3>
                        <h3>реон / комерција / план / град / возило</h3>
                    </div>
                    <h3 className='table-header-comment'>Коментар</h3>
                </div>

                {editTable ? (
                    <>
                        {editTable.tableArr.map((d) => (
                            <Link
                                onClick={() => setId(d._id)}
                                to='#'
                                key={d._id}>
                                {id && id === d._id ? (
                                    <EditTableString
                                        d={d}
                                        tableID={editTable._id}
                                    />
                                ) : (
                                    <TableString d={d} />
                                )}
                            </Link>
                        ))}
                        {id && id === 'user-comment' ? (
                            <div className='edit-table-item table-user-comment string-table-item p-2'>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (userComment === 'Додај Коментар') {
                                            setUserComment('');
                                        }
                                        setId(null);
                                        addTableComment(
                                            editTable._id,
                                            userComment
                                        );
                                        if (userComment === '') {
                                            setUserComment('Додај Коментар');
                                        }
                                    }}>
                                    <input
                                        autoFocus
                                        type='text'
                                        name='table-comment'
                                        value={userComment}
                                        onChange={(e) =>
                                            setUserComment(e.target.value)
                                        }
                                    />
                                    <input
                                        type='submit'
                                        value='Зачувај Коментар'
                                    />
                                </form>
                            </div>
                        ) : (
                            <Link
                                onClick={() => {
                                    setId('user-comment');
                                    if (userComment === 'Додај Коментар') {
                                        setUserComment('');
                                    }
                                }}
                                to='#'>
                                <div className='table-user-comment string-table-item p-2'>
                                    {/* {editTable.tableComment
                                        ? editTable.tableComment
                                        : userComment
                                        ? userComment
                                        : 'Додај Коментар'} */}
                                    {userComment}
                                </div>
                            </Link>
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

export default EditedTable;
