import { NextResponse } from 'next/server';

const store = new Map();

if (!store.size) {
  const id = crypto.randomUUID();
  store.set(id, {
    id,
    flightNumber: 'VSA100',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: new Date().toISOString(),
    arrivalTime: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    aircraftId: null,
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
      flightNumber: body.flightNumber || '',
      origin: body.origin || '',
      destination: body.destination || '',
      departureTime: body.departureTime || new Date().toISOString(),
      arrivalTime: body.arrivalTime || new Date().toISOString(),
      aircraftId: body.aircraftId || null,
    };
    store.set(id, item);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
