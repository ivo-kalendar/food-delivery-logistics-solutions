import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/dist/locale/mk';

const LocaleTime = () => {
    const [time, setTime] = useState(`                точно е...`);
    let currentTime = time.split('').slice(16, time.length);
    let currentDate = time.split('').slice(0, 16);

    useEffect(() => {
        setInterval(() => {
            setTime(`${moment().locale('mk').format('llll')}`);
        }, 10000);
    }, []);

    return (
        <p>
            <span>{currentDate}</span>
            {currentTime}
        </p>
    );
};

export default LocaleTime;
