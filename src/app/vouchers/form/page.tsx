'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { checkVoucherSeat, generateVoucherSeat } from '@/services/voucherseat.service';
import { VoucherSeat, Flight } from '@/interfaces';


export default function VoucherFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState<Partial<VoucherSeat>>({});
  const [error, setError] = useState<string>('');

  const checkVoucher = async () => {

    setError('');

    try {
      const formattedData = {
        ...formData,
        flight_date: new Date(formData.flight_date).toISOString(),
      };
      const data = await checkVoucherSeat(formattedData as Omit<VoucherSeat, 'id'>);
      setFormData({
        ...formData,
        seat1: data.random_seat?.[0] || "",
        seat2: data.random_seat?.[1] || "",
        seat3: data.random_seat?.[2] || "",
      });

      if (data.exists) {
        setError('You Have generated a voucher for this flight. Please check your voucher details.');
      }
      if (!data.exists) {
        setError('You have not generated a voucher for this flight yet. Please generate by clicking the Generate Voucher button.');
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const generateVoucher = async () => {
    setError('');

    try {
      const formattedData = {
        ...formData,
        flight_date: new Date(formData.flight_date).toISOString(),
      };
      const data = await generateVoucherSeat(formattedData as Omit<VoucherSeat, 'id'>);
      setFormData({
        ...formData,
        seat1: data.random_seat?.[0] || "",
        seat2: data.random_seat?.[1] || "",
        seat3: data.random_seat?.[2] || "",
      });
      
    } catch (err) {
      setError(err.message || 'Error generating voucher. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{id ? 'Edit Voucher' : 'Add Voucher'}</h1>
        <button onClick={() => router.push('/vouchers')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
      </div>

      <form className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Crew ID:</label>
          <input type="text" value={formData.crew_id || ''} onChange={(e) => setFormData({...formData, crew_id: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Crew Name:</label>
          <input type="text" value={formData.crew_name || ''} onChange={(e) => setFormData({...formData, crew_name: e.target.value})} className="border p-2 w-full rounded" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Flight Number:</label>
          <input type="text" value={formData.flight_number || ''} onChange={(e) => setFormData({...formData, flight_number: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Flight Date:</label>
          <input type="date" value={formData.flight_date ? formData.flight_date.split('T')[0] : ''} onChange={(e) => setFormData({...formData, flight_date: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Seat Number:</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={formData.seat1 || ''}
              onChange={(e) => setFormData({ ...formData, seat1: e.target.value })}
              className="border p-1 w-16 text-center rounded text-sm"
              placeholder='Seat 1'
              required
              readOnly
            />
            <input
              type="text"
              value={formData.seat2 || ''}
              onChange={(e) => setFormData({ ...formData, seat2: e.target.value })}
              className="border p-1 w-16 text-center rounded text-sm"
              placeholder='Seat 2'
              required
              readOnly
            />
            <input
              type="text"
              value={formData.seat3 || ''}
              onChange={(e) => setFormData({ ...formData, seat3: e.target.value })}
              className="border p-1 w-16 text-center rounded text-sm"
              placeholder='Seat 3'
              required
              readOnly
            />
            
          </div>

        </div>
        <div className="flex space-x-4">
          <button
              type="button"
              onClick={checkVoucher}
              className="bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 text-sm"
            >
              Check Voucher
            </button>
          <button
              type="button"
              onClick={generateVoucher}
              className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 text-sm"
            >
              Generate Voucher
            </button>
        </div>
        <div className="container mx-auto p-4">
          {/* ... rest of your form */}
          {error && <p className="text-red-500">{error}</p>}
          {/* ... rest of your form */}
        </div>
      </form>
    </div>
  );
}