'use client'

import dayjs, { Dayjs, } from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(duration);

export default function Home() {
    const [timestamp, updateTimestamp] = useState<Dayjs | null>(null);
    const [renderTimestamp,] = useState(dayjs());
    const [localMilli, updateLocalMilli] = useState(0);
    
    useEffect(() => {
        if(timestamp !== null) {
            return
        }

        async function getTimestamp() {
            const response = await fetch('http://localhost:3000/api/timestamp');
            const json = await response.json();
            updateTimestamp(dayjs(json['created_at']));
        }

        getTimestamp();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updateLocalMilli(dayjs().diff(renderTimestamp, "milliseconds"));
        }, 1);
        return () => clearInterval(interval);
    }, [localMilli, updateLocalMilli]);

    const difference = dayjs.duration(dayjs(renderTimestamp).add(localMilli, 'millisecond').diff(timestamp));
    
    const milli = difference.milliseconds();
    const seconds = difference.seconds();
    const minutes = difference.minutes();
    const hours = difference.hours();
    const days = difference.days();

    if(timestamp === null) {
        return <></>;
    }

    return (
        <>
            <div> {days} Days since last 9/11 Reference in Lab </div>
            <div> {hours}:{minutes}:{seconds}.{milli} </div>
        </>
    );
}
