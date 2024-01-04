import React, { useCallback, useEffect, useState } from 'react';
import './footer.scss';

const Footer = () => {
    const [counter, setCounter] = useState({
        day: null,
        hour: null,
        minute: null,
        second: null,
    });

    const countUpFromTime = useCallback((cf, id) => {
        let countFrom = new Date(cf).getTime();
        var now = new Date();
        countFrom = new Date(countFrom);
        let timeDifference = now - countFrom;

        var secondsInADay = 60 * 60 * 1000 * 24,
            secondsInAHour = 60 * 60 * 1000;

        let days = Math.floor((timeDifference / secondsInADay) * 1);
        let hours = Math.floor(((timeDifference % secondsInADay) / secondsInAHour) * 1);
        let mins = Math.floor((((timeDifference % secondsInADay) % secondsInAHour) / (60 * 1000)) * 1);
        let secs = Math.floor(((((timeDifference % secondsInADay) % secondsInAHour) % (60 * 1000)) / 1000) * 1);

        setCounter({ day: days, hour: hours, minute: mins, second: secs });

        clearTimeout(countUpFromTime.interval);
        countUpFromTime.interval = setTimeout(function () {
            countUpFromTime(countFrom, id);
        }, 1000);
    }, []);

    useEffect(() => {
        countUpFromTime('Aug 27, 2023 12:00:00', 'countup1');
    }, [countUpFromTime]);

    return (
        <footer>
            <div className='countup' id='countup1'>
                <span>{counter.day}</span>
                <span> gün </span>
                <span>{counter.hour}</span>
                <span> saat </span>
                <span>{counter.minute}</span>
                <span> dakika </span>
                <span>{counter.second}</span>
                <span> saniyedir</span>
                <span> benimsin...</span>
            </div>
        </footer>
    );
};

export default Footer;
