'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAircraftList, deleteAircraft } from '@/services/aircraft.service';
import { Aircraft} from '@/interfaces';


export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = async () => {
    try {
      const data = await getAircraftList();
      setAircraft(data);
    } catch (error) {
      console.error('Error fetching aircraft:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await deleteAircraft(id);
        fetchAircraft();
      } catch (error) {
        console.error('Error deleting aircraft:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Aircraft List</h1>
        <Link
          href="/aircraft/form"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Aircraft
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aircraft Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number of Rows
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seats Per Row
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {aircraft.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {item.aircraft_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {item.num_rows}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {item.seats_per_row}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/aircraft/form?id=${item.id}`}
                    className="text-yellow-600 hover:text-yellow-700 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}