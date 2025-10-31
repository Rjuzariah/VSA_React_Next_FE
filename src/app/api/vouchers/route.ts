import { NextResponse } from 'next/server';

const store = new Map();

if (!store.size) {
  const id = crypto.randomUUID();
  store.set(id, {
    id,
    code: 'PROMO2025',
    flightId: null,
    seatNumber: '12A',
    passengerName: 'John Doe',
    status: 'active',
    expirationDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
  });
}

export async function GET() {
  return NextResponse.json(Array.from(store.values()));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = crypto.randomUUID();
    const item = {
      id,
      code: body.code || '',
      flightId: body.flightId || null,
      seatNumber: body.seatNumber || '',
      passengerName: body.passengerName || '',
      status: body.status || 'active',
      expirationDate: body.expirationDate || new Date().toISOString(),
    };
    store.set(id, item);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
