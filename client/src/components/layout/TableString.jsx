const TableString = ({ d }) => {
    return (
        <div key={d._id} className='table-item string-table-item'>
            <div className='table-item-info'>
                <div className='table-item-name'>{d.ime}</div>
                <div className='table-item-hour'>{d.time}</div>
                <div className='table-item-comercial'>
                    {d.komercial} {d.city}
                </div>
            </div>
            <div className='table-item-comment'>{d.comment}</div>
        </div>
    );
};

export default TableString;
