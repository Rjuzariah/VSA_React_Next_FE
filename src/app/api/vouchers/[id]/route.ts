import { NextResponse } from 'next/server';

const store = new Map();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const item = store.get(id);
  if (item) return NextResponse.json(item);
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await req.json();
    const existing = store.get(id);
    if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = {
      ...existing,
      code: body.code ?? existing.code,
      flightId: body.flightId ?? existing.flightId,
      seatNumber: body.seatNumber ?? existing.seatNumber,
      passengerName: body.passengerName ?? existing.passengerName,
      status: body.status ?? existing.status,
      expirationDate: body.expirationDate ?? existing.expirationDate,
    };
    store.set(id, updated);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const existed = store.delete(id);
  if (!existed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
