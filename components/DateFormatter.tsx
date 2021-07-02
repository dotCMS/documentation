import React from 'react';

export const DateFormatter = ({ time }: { time: string }): JSX.Element => {
    const date = new Date(time);
    const formattedDate = `${date.toLocaleDateString('en-US', {
        month: 'short'
    })} ${date.getDay()}, ${date.getFullYear()}`;
    return <time dateTime={time}>{formattedDate}</time>;
};
