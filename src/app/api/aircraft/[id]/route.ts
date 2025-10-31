import { NextResponse } from 'next/server';

const store = new Map();

// Note: This file runs in module scope but the main collection file holds the seeded data.
// We synchronize by reading/updating the same-memory across imports isn't reliable in serverless,
// but for local dev in a single process this keeps data available.

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
      registrationNumber: body.registrationNumber ?? existing.registrationNumber,
      aircraftType: body.aircraftType ?? existing.aircraftType,
      numRows: typeof body.numRows === 'number' ? body.numRows : parseInt(body.numRows ?? existing.numRows),
      seatsPerRow: body.seatsPerRow ?? existing.seatsPerRow,
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
