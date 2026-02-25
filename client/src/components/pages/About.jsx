import { FaGithub } from 'react-icons/fa';
import Copyright from '../layout/Copyright';

const About = () => {
    return (
        <div className='text-secondary' style={{ marginTop: '2rem' }}>
            <h1>за Страната</h1>
            <p className='my-1'>
                Ова е full stack MERN Апликација креирана за потребите на{' '}
                <a target='_blank' rel='noreferrer' href='//www.google.com'>
                    Food Delivery Company (променето да насочува кон google.com)
                </a>{' '}
                .
            </p>
            <p className='my-1'>
                Целиот код е достапен на{' '}
                <a
                    target='_blank'
                    rel='noreferrer'
                    href='https://github.com/ivo-kalendar/food-delivery-logistics-solutions'>
                    <FaGithub /> GitHub
                </a>{' '}
                .
            </p>
            <p className='bg-light-2 p'>Верзија: {__APP_VERSION__}</p>
            <p className='bg-light-2 p'>Оригинална Дата: 21.08.2019</p>
            <p className='bg-light-2 p'>
                Powered by:{' '}
                <a href="mailto:ivokalendar@icloud.com" area-label="Contact Developer">
                    Ivo Kalendarov
                </a>
            </p>
            <Copyright />
        </div>
    );
};

export default About;
