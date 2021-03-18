import React from 'react';
import moment from 'moment';

const Moment = () => {
    const time = moment().format();
    const hour = moment().format('h:mm A');
    const timeAgo = moment().startOf('hour').fromNow();
    return (
        <>
        <div>
            <p>{time}</p>
            <p>{hour}</p>
            <p>{timeAgo}</p>
        </div>
        <div>
            
        </div>
        </>
    )
}

export default Moment
