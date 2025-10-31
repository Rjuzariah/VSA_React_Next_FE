// src/services/flight.service.tsx

import { Flight} from '@/interfaces';

const API_BASE = 'http://localhost:8081/api/flights/';

export async function getFlightList(): Promise<Flight[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch flight');
  return response.json();
}

export async function getFlightById(id: string): Promise<Flight> {
  const response = await fetch(`${API_BASE}${id}`);
  if (!response.ok) throw new Error('Failed to fetch flight');
  return response.json();
}

export async function createFlight(data: Omit<Flight, 'id'>): Promise<Flight> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create flight');
  return response.json();
}

export async function updateFlight(id: string, data: Omit<Flight, 'id'>): Promise<Flight> {
  const response = await fetch(`${API_BASE}${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update flight');
  return response.json();
}

export async function deleteFlight(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete flight');
}
