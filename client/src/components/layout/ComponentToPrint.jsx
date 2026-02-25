import { useContext } from 'react';
import TablesContext from '../../context/tablesContext';
import moment from 'moment';
import 'moment/dist/locale/mk';
import SelectedItem from './SelectedItem';

const ComponentToPrint = () => {
    const tablesContext = useContext(TablesContext);
    const { selectedTable } = tablesContext;

    let today, sledenRabotenDen, denes;
    if (selectedTable) {
        today = moment(selectedTable.date).locale('mk').format('DD.MM.YYYY');
        denes = moment(selectedTable.date).locale('mk').format('dddd');
        let utre = moment(selectedTable.date)
            .add(1, 'days')
            .locale('mk')
            .format('dddd');

        denes = denes.charAt(0).toLocaleUpperCase() + denes.slice(1);
        sledenRabotenDen = utre.charAt(0).toLocaleUpperCase() + utre.slice(1);
        if (denes === 'Петок' || denes === 'Сабота') {
            sledenRabotenDen = 'Понеделник';
        }
    }

    return (
        <>
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

                <div className='table-content'>
                    {selectedTable ? (
                        <>
                            {selectedTable.tableArr.map((d) => (
                                <div key={d._id} className='element-break'>
                                    <SelectedItem distributor={d} />
                                </div>
                            ))}

                            {selectedTable.tableComment && (
                                <div className='table-user-comment'>
                                    {selectedTable.tableComment}
                                </div>
                            )}
                        </>
                    ) : (
                        'Нема информации за Табелата...'
                    )}
                </div>

                <div className='space-between bottom'>
                    <p>{moment().locale('mk').format('llll')}</p>
                    <p>Copyright &copy; 2020 Ivo Kalendarov</p>
                </div>
                <div style={{ margin: '0.2rem' }}></div>
            </div>
        </>
    );
};

export default ComponentToPrint;
