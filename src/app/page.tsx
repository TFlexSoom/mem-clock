'use client'

import dayjs, { Dayjs, } from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";
import Link from "next/link";

dayjs.extend(utc)
dayjs.extend(timezone)
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
            const response = await fetch('/api/timestamp');
            const json = await response.json();
            updateTimestamp(dayjs(json['created_at']).tz('Etc/UTC', true));
        }

        getTimestamp();
    }, [timestamp]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateLocalMilli(dayjs().diff(renderTimestamp, "milliseconds"));
        }, 1);
        return () => clearInterval(interval);
    }, [renderTimestamp, localMilli, updateLocalMilli]);

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
        <main className="flex flex-col h-full w-full text-black bg-linear-to-br from-cyan-600 to-blue-600">
            <nav className="flex flex-row bg-white py-4 px-4 items-center justify-between w-full rounded-md ">
                <span className="text-black font-semibold text-lg">Of Potatos and Blabbers</span>
                <Link href="/reset" className=" bg-black rounded-lg py-2 px-4 text-white hover:cursor-pointer hover:shadow-xl">Reset Clock</Link>
            </nav>
            <section className=" flex flex-col flex-grow items-center ">
                <div className=" text-[#FAB972] text-[18em]"> {hours}:{minutes}:{seconds}.{milli} </div>
                <div className=" text-[#FAB972] text-4xl"> and {days} Day{days !== 1 ? 's' : ''} since last 9/11 Reference in Lab </div> 
            </section>
            <footer className="flex flex-row w-full bg-white px-8 pt-4 ">
                <span className="text-black">Made with NextJS in Vercel</span>
            </footer>
        </main>
    );
}
