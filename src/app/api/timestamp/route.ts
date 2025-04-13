'use server';

import { neon } from "@neondatabase/serverless";

export async function GET() {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const [row] = await sql`SELECT created_at FROM mem_clock_record ORDER BY created_at DESC LIMIT 1;`;
    return new Response(JSON.stringify(row));
}
