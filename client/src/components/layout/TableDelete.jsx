import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TableContext from '../../context/tablesContext';

const TableDelete = () => {
    const tablesContext = useContext(TableContext);
    const { deleteTable, backFromDelete, selectedTable } = tablesContext;

    return (
        <div>
            <p className='text-secondary p-2' style={{ textAlign: 'center' }}>
                Дали си сигурен дека сакаш да ја избришеш табелата?
            </p>
            <ul
                className='grid-2'
                style={{ textAlign: 'center', fontSize: '1.5rem' }}>
                <li>
                    <Link onClick={() => deleteTable(selectedTable._id)} to='#'>
                        Да
                    </Link>
                </li>
                <li>
                    <Link onClick={() => backFromDelete()} to='#'>
                        Не
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default TableDelete;
