'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getVoucherById, createVoucher, updateVoucher } from '@/services/voucherseat.service';
import { getFlightList } from '@/services/flight.service';
import { VoucherSeat, Flight } from '@/interfaces';


export default function VoucherFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState<Partial<VoucherSeat>>({});
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    fetchFlights();
    if (id) fetchVoucher(id);
  }, [id]);

  const fetchFlights = async () => {
    try {
      const data = await getFlightList();
      setFlights(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchVoucher = async (vid: string) => {
    try {
      const data = await getVoucherById(vid);
      setFormData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateVoucherCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({ ...formData, code: randomCode });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateVoucher(id, formData as Omit<VoucherSeat, 'id'>);
      } else {
        await createVoucher(formData as Omit<VoucherSeat, 'id'>);
      } router.push('/vouchers');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{id ? 'Edit Voucher' : 'Add Voucher'}</h1>
        <button onClick={() => router.push('/vouchers')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Crew ID:</label>
          <input type="text" value={formData.crew_id || ''} onChange={(e) => setFormData({...formData, crew_id: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Crew Name:</label>
          <input type="text" value={formData.crew_name || ''} onChange={(e) => setFormData({...formData, crew_name: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Flight:</label>
          <select value={formData.flight_id || ''} onChange={(e) => setFormData({...formData, flight_id: Number(e.target.value)})} className="border p-2 w-full rounded" required>
            <option value="">Select Flight</option>
            {flights.map(f => (<option key={f.id} value={f.id}>{f.flight_number} - {f.aircraft.aircraft_type}</option>))}
          </select>
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
            />
            <input
              type="text"
              value={formData.seat2 || ''}
              onChange={(e) => setFormData({ ...formData, seat2: e.target.value })}
              className="border p-1 w-16 text-center rounded text-sm"
              placeholder='Seat 2'
              required
            />
            <input
              type="text"
              value={formData.seat3 || ''}
              onChange={(e) => setFormData({ ...formData, seat3: e.target.value })}
              className="border p-1 w-16 text-center rounded text-sm"
              placeholder='Seat 3'
              required
            />
            <button
              type="button"
              onClick={generateVoucherCode}
              className="bg-green-500 text-white px-3 py-1.5 rounded hover:bg-green-600 text-sm"
            >
              Generate
            </button>
          </div>

        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">{id ? 'Update' : 'Create'} Voucher</button>
          <button type="button" onClick={() => router.push('/vouchers')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}