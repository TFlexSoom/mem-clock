import { neon } from "@neondatabase/serverless";
import dayjs from "dayjs";

export default function Home() {
  async function getTimestamp() {
    'use server';

    const sql = neon(`${process.env.DATABASE_URL}`);
    const [row] = await sql`SELECT created_at FROM mem_clock_record ORDER BY created_at DESC;`;
    console.log(row);
    return row['created_at'];
  }

  async function getDaysSince() {
    const createdAtTimestamp = await getTimestamp();
    return dayjs().diff(createdAtTimestamp, 'days');
  }

  return (
    <div> {getDaysSince()} Days since last 9/11 Reference in Lab </div>
  );
}
