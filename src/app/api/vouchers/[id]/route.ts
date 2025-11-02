import { NextResponse } from 'next/server';

const store = new Map();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const item = store.get(id);
  if (item) return NextResponse.json(item);
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
