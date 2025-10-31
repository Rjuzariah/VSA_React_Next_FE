import { VoucherSeat } from '@/interfaces';

const API_BASE = 'http://localhost:8081/api/vouchers/';

export const getVoucherList = async (): Promise<VoucherSeat[]> => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch vouchers');
  return response.json();
};

export const getVoucherById = async (id: string): Promise<VoucherSeat> => {
  const response = await fetch(`${API_BASE}${id}`);
  if (!response.ok) throw new Error(`Failed to fetch voucher with id ${id}`);
  return response.json();
};

export const createVoucher = async (data: Omit<VoucherSeat, 'id'>): Promise<VoucherSeat> => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create voucher');
  return response.json();
};

export const updateVoucher = async (id: string, data: Omit<VoucherSeat, 'id'>): Promise<VoucherSeat> => {
  const response = await fetch(`${API_BASE}${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(`Failed to update voucher with id ${id}`);
  return response.json();
};

export const deleteVoucher = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Failed to delete voucher with id ${id}`);
};
