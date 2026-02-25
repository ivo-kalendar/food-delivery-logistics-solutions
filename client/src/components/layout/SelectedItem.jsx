import {
    iceCreamArr,
    provintialArr,
    notWorkingArr,
} from '../../enums/variables';

const SelectedItem = ({ distributor }) => {
    const { ime, komercial, comment, time } = distributor;

    return (
        <div
            className={`table-item ${
                notWorkingArr.includes(comment.trim())
                    ? 'bcg-inactive'
                    : ime === 'Ељхан Ајдари' || ime === 'Владимир Ѓошевски'
                    ? 'bcg-truck'
                    : komercial
                          .split(',')
                          .some((e) => iceCreamArr.includes(e.trim()))
                    ? 'bcg-icecream'
                    : komercial
                          .split(',')
                          .some((e) => provintialArr.includes(e.trim()))
                    ? 'bcg-provincial'
                    : comment.split(',').some((e) => e.trim() === 'Маркети')
                    ? 'bcg-ka'
                    : 'bcg-normal'
            }`}>
            <div className='table-item-info'>
                <div className='table-item-name'>{ime}</div>
                <div className='table-item-hour'>{time}</div>
                <div className='table-item-comercial'>{komercial}</div>
            </div>
            <div className='table-item-comment'>{comment}</div>
        </div>
    );
};

export default SelectedItem;
