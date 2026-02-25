const TextString = ({ el }) => {
    return (
        <div className='form-group'>
            <div
                className='btn btn-link btn-primary'
                style={{
                    background: 'transparent',
                    margin: ' .2rem 0 0 0',
                    display: 'grid',
                    gridTemplateColumns: '1fr .2fr 3fr',
                }}>
                <p
                    style={{
                        maxWidth: '150px',
                        overflow: 'hidden',
                        margin: '0 .5rem',
                    }}>
                    {el.key}:{' '}
                </p>
                <div
                    style={{
                        marginTop: '-1.2rem',
                        height: 'calc(100% + 1.2rem)',
                        width: '1px',
                        background: 'hsl(209, 100%, 60%)',
                    }}></div>
                <p style={{ overflow: 'hidden' }}> {el.value}</p>
            </div>
        </div>
    );
};

export default TextString;
