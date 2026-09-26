import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ ok: true, database: "up" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error("[health]", message);
    return NextResponse.json(
      {
        ok: false,
        database: "down",
        error: message.slice(0, 200),
      },
      { status: 503 },
    );
  }
}
