import moment from 'moment';
import 'moment/dist/locale/mk';

const TableCard = ({ table }) => {
    let today = moment(table.date).locale('mk').format('DD.MM');
    let denes = moment(table.date).locale('mk').format('dddd');
    let utre = moment(table.date).add(1, 'days').locale('mk').format('dddd');

    denes = denes.charAt(0).toLocaleUpperCase() + denes.slice(1);
    let sledenRabotenDen = utre.charAt(0).toLocaleUpperCase() + utre.slice(1);
    if (denes === 'Петок' || denes === 'Сабота')
        sledenRabotenDen = 'Понеделник';

    return (
        <>
            <div className='table-card-text'>
                <p className='small-letters'>План за</p>
                <p className='small-letters'>Дистрибуција за</p>
                <p>{sledenRabotenDen}</p>
            </div>
            <div className='extra-small-letters'>
                Quas quam magnam quasi laboriosam animi quidem dolorem assumenda
                sit odit, necessitatibus harum incidunt eius consequatur vitae
                velit dolor provident non in excepturi ad dolore minus quibusdam
                totam recusandae.
            </div>
            <div className='extra-small-letters'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis sint quam nemo, praesentium vitae, suscipit eius
                deserunt aspernatur voluptatem, error atque. Quas quam magnam
                quasi laboriosam animi quidem dolorem assumenda sit odit,
                necessitatibus harum incidunt eius consequatur vitae velit dolor
                provident non in excepturi ad dolore minus quibusdam totam
                recusandae. Doloremque suscipit ea facilis mollitia enim minus
                repellat officia, amet accusantium quis, ipsa voluptatem quam
                ipsam soluta fugit optio? Mollitia recusandae minima soluta
                culpa, quia, quidem suscipit ut inventore, quisquam deserunt
                tempora ducimus saepe. Quis in fuga voluptatibus minus est
                magnam officiis, quod dolor doloremque, enim natus alias quo
                suscipit ab debitis?
            </div>
            <div className='small-letters table-card-text'>
                <p>креирано {table.ime ? 'од' : 'на'}</p>
                <p>
                    {table.ime
                        ? `${table.name || table.ime} на`
                        : `${today}.${denes}`}
                </p>
                <p>{table.ime ? `${today}.${denes}` : null}</p>
            </div>
        </>
    );
};

export default TableCard;
