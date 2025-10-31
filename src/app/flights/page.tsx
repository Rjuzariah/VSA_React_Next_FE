'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFlightList, deleteFlight} from '@/services/flight.service';
import { Flight} from '@/interfaces';


export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const data = await getFlightList();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await deleteFlight(id);
        fetchFlights();
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Flights</h1>
        <Link href="/flights/form" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Flight
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Aircraft</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{f.flight_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{f.aircraft.aircraft_type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">{f.flight_date ? f.flight_date.split('T')[0] : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/flights/form?id=${f.id}`} className="text-yellow-600 hover:text-yellow-700 mr-4">Edit</Link>
                  <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}