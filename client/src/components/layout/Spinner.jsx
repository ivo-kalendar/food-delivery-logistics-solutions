import spinner from './spinner.svg';

const Spinner = () => {
    const spinnerStyle = {
        width: '8rem',
        paddingTop: '9rem',
        margin: 'auto',
        display: 'block',
    };

    return (
        <div className='container'>
            <img src={spinner} style={spinnerStyle} alt='Loading...' />
        </div>
    );
};

export default Spinner;
