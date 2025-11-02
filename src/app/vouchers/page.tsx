'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VoucherSeat } from '@/interfaces';
import { getVoucherList,  } from '@/services/voucherseat.service';  
import { getAircraftList } from '@/services/aircraft.service';

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<VoucherSeat[]>([]);
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  useEffect(() => {
    fetchVouchers();
    if (!aircraft.length && vouchers.length>0){
      fetchAircraft();
    }
  }, []);

  const fetchVouchers = async () => {
    try {
      const data = await getVoucherList();
      setVouchers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAircraft = async () => {
    try {
      const data = await getAircraftList();
      setAircraft(data);
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aircraft</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vouchers.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.crew_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.crew_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.flight_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.flight_date ? v.flight_date.split('T')[0] : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{v.aircraft_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                    {v.seat1}
                  </span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded mr-2">
                    {v.seat2}
                  </span>
                  <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {v.seat3}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}