'use server';

import dayjs from "dayjs";
import { neon } from "@neondatabase/serverless";
import { redirect } from 'next/navigation'

export async function resetTimer(formData: FormData) {
    const password = formData.get("password");
    if(password === null) {
        return;
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    const passRows = await sql`SELECT 1 FROM password WHERE text = ${password};`;

    if(passRows.length === 0) {
        return;
    }

    const [latest] = await sql`SELECT created_at FROM mem_clock_record ORDER BY created_at DESC LIMIT 1;`;
    const createdAtDayjs = dayjs(latest["created_at"]);
    if(createdAtDayjs.add(30, 'second').isAfter(dayjs())) {
        return;
    }
    
    await sql`INSERT INTO mem_clock_record (created_at) VALUES (CURRENT_TIMESTAMP);`;


    redirect("/");
}
