import spinner from './spinner.svg';

const Spinner2 = () => {
    const spinnerStyle = {
        width: '3rem',
        margin: 'auto',
        display: 'block',
    };

    return (
        <div>
            <img src={spinner} style={spinnerStyle} alt='Loading...' />
        </div>
    );
};

export default Spinner2;
