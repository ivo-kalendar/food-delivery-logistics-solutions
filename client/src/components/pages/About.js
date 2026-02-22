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
                    href='https://github.com/ivo-kalendar/driver-schedule-sass'>
                    <FaGithub /> GitHub
                </a>{' '}
                .
            </p>
            <p className='bg-light-2 p-1'>Верзија: 4.0.1</p>
            <p className='bg-light-2 p-1'>Дата: 19.09.2022</p>
            <Copyright />
        </div>
    );
};

export default About;
