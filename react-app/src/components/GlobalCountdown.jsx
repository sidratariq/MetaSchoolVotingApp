import React, { useEffect, useState } from 'react';

const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const timeLeft = now.getTime() -99358160662;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
    };
};

const GlobalCountdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        setTimeLeft(calculateTimeLeft(targetDate)); // Set initial state on client side
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="outer_counter">
            <div className="inner_counter">
                {timeLeft.days}
            </div>
            <div className="inner_counter">
                {timeLeft.hours}
            </div>
            <div className="inner_counter">
                {timeLeft.minutes}
            </div>
            <div className="inner_counter">
                {timeLeft.seconds}
            </div>
        </div>
    );
};

export default GlobalCountdown;