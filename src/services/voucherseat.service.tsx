import { VoucherSeat } from '@/interfaces';

const API_BASE = 'http://localhost:8081/api/vouchers/';

export const getVoucherList = async (): Promise<VoucherSeat[]> => {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error('Failed to fetch vouchers');
  return response.json();
};

export const checkVoucherSeat = async (data: Omit<VoucherSeat, 'id'>): Promise<VoucherSeat> => {
  const response = await fetch(`${API_BASE}check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create voucher');
  return response.json();
};

export const generateVoucherSeat = async (data: Omit<VoucherSeat, 'id'>): Promise<VoucherSeat> => {
  const response = await fetch(`${API_BASE}generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || errorMessage.error || 'Failed to generate voucher');
  }

  return response.json();
};
