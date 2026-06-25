import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/** Lightweight liveness probe — always 200 when the app process is running. */
export async function GET() {
  return NextResponse.json(
    { ready: true, timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
