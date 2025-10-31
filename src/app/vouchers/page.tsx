'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VoucherSeat } from '@/interfaces';
import { getVoucherList, deleteVoucher,  } from '@/services/voucherseat.service';  

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<VoucherSeat[]>([]);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const data = await getVoucherList();
      setVouchers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this voucher?')) return;
    try {
      const resp = await deleteVoucher(id);
      fetchVouchers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vouchers</h1>
        <Link href="/vouchers/form" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Voucher</Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crew Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vouchers.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.crew_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.crew_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.flight.flight_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.flight.aircraft.aircraft_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  <span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                    {v.seat1}
                  </span>
                  <span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                    {v.seat2}
                  </span>
                  <span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {v.seat3}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/vouchers/form?id=${v.id}`} className="text-yellow-600 hover:text-yellow-700 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(v.id)} className="text-red-600 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}