// src/services/aircraft.service.tsx

import { Aircraft } from '@/interfaces';

const API_BASE = 'http://localhost:8081/api/aircraft/';

export async function getAircraftList(): Promise<Aircraft[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch aircraft');
  return response.json();
}

export async function getAircraftById(id: string): Promise<Aircraft> {
  const response = await fetch(`${API_BASE}${id}`);
  if (!response.ok) throw new Error('Failed to fetch aircraft');
  return response.json();
}

export async function createAircraft(data: Omit<Aircraft, 'id'>): Promise<Aircraft> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create aircraft');
  return response.json();
}

export async function updateAircraft(id: string, data: Omit<Aircraft, 'id'>): Promise<Aircraft> {
  const response = await fetch(`${API_BASE}${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update aircraft');
  return response.json();
}

export async function deleteAircraft(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete aircraft');
}
