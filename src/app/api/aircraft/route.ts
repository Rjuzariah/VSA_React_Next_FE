import { NextResponse } from 'next/server';

// In-memory store for aircraft
const store = new Map();

// Seed with one example (optional)
if (!store.size) {
  const id = crypto.randomUUID();
  store.set(id, {
    id,
    registrationNumber: 'N12345',
    aircraftType: 'A320',
    numRows: 30,
    seatsPerRow: 'ABCDEF',
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
      registrationNumber: body.registrationNumber || '',
      aircraftType: body.aircraftType || '',
      numRows: typeof body.numRows === 'number' ? body.numRows : parseInt(body.numRows || '0'),
      seatsPerRow: body.seatsPerRow || '',
    };
    store.set(id, item);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
