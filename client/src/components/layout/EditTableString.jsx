import { useContext, useEffect, useState } from 'react';
import TableContext from '../../context/tablesContext';
import Spinner2 from './Spinner2';

const EditTableString = ({ d, tableID }) => {
    const tableContext = useContext(TableContext);
    const { updateTable, hour, komercija, komentar, editTable } = tableContext;
    const [hideComment, setHideComment] = useState(false);
    const [hideKomercial, setHideKomercial] = useState(false);
    const [hourChange, setHourChange] = useState(false);

    useEffect(() => {
        if (hideComment) setHideComment(false);
        if (hideKomercial) setHideKomercial(false);
        if (hourChange) setHourChange(false);
        // eslint-disable-next-line
    }, [editTable]);

    const onChange = (e) => {
        if (e.target.name === 'comment') setHideComment(true);
        if (e.target.name === 'komercial') setHideKomercial(true);
        if (e.target.name === 'time') setHourChange(true);
        updateTable(tableID, d._id, e.target.name, e.target.value);
    };

    return (
        <div className='table-item edit-table-item'>
            <div className='table-item-info'>
                <div className='table-item-name'>{d.ime}</div>
                {hourChange ? (
                    <>
                        <div className='table-item-hour'>
                            <Spinner2 />
                        </div>
                        <div className='table-item-comercial text-success border-success'>
                            ...почекајте сортирање поради промена на работното
                            време
                        </div>
                    </>
                ) : (
                    <>
                        <div className='table-item-hour'>
                            {!hour.length ? (
                                <Spinner2 />
                            ) : (
                                <select
                                    onChange={onChange}
                                    name='time'
                                    id='time'>
                                    <option defaultValue={d.time}>
                                        {d.time}
                                    </option>
                                    {hour.map((g, i) => (
                                        <option value={g} key={i}>
                                            {g}
                                        </option>
                                    ))}
                                    {d.time !== '' ? <option></option> : null}
                                </select>
                            )}
                        </div>
                        <div className='table-item-comercial'>
                            {hideKomercial ? (
                                <Spinner2 />
                            ) : (
                                <select
                                    onChange={onChange}
                                    name='komercial'
                                    id='komercial'>
                                    <option defaultValue={d.komercial}>
                                        {d.komercial}
                                    </option>
                                    {komercija
                                        .filter((e) => !d.komercial.includes(e))
                                        .map((g, i) => (
                                            <option
                                                value={
                                                    !d.komercial
                                                        ? g
                                                        : `${d.komercial}, ${g}`
                                                }
                                                key={i}>
                                                {!d.komercial
                                                    ? g
                                                    : `${d.komercial}, ${g}`}
                                            </option>
                                        ))}
                                    {d.komercial !== '' ? (
                                        <option></option>
                                    ) : null}
                                </select>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className='table-item-comment'>
                {hideComment ? (
                    <Spinner2 />
                ) : (
                    <select onChange={onChange} name='comment' id='comment'>
                        <option defaultValue={d.comment}>{d.comment}</option>
                        {d.comment !== '' ? <option></option> : null}
                        {komentar
                            .filter((g) => !d.comment.includes(g))
                            .map((g, i) => (
                                <option
                                    value={
                                        !d.comment ? g : `${d.comment}, ${g}`
                                    }
                                    key={i}>
                                    {!d.comment ? g : `${d.comment}, ${g}`}
                                </option>
                            ))}
                    </select>
                )}
            </div>
        </div>
    );
};

export default EditTableString;
