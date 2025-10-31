'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Flight, Aircraft} from '@/interfaces';
import { createFlight, getFlightById, getFlightList, updateFlight } from '@/services/flight.service';
import { getAircraftById, createAircraft, updateAircraft, getAircraftList } from '@/services/aircraft.service';

export default function FlightFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState<Partial<Flight>>({
    flight_number: '',
    aircraft_id: '',
  });
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  useEffect(() => {
    fetchAircraft();
    if (id) fetchFlight(id);
  }, [id]);

  const fetchAircraft = async () => {
    try {
      const data = await getAircraftList();
      setAircraft(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFlight = async (fid: string) => {
    try {
      const data = await getFlightById(fid);
      setFormData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        flight_date: new Date(formData.flight_date).toISOString(),
      };
      if (id) {
        await updateFlight(id, formattedData as Omit<Flight, 'id'>);
      } else {
        await createFlight(formattedData as Omit<Flight, 'id'>);
      } router.push('/flights');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{id ? 'Edit Flight' : 'Add Flight'}</h1>
        <button onClick={() => router.push('/flights')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Flight Number:</label>
          <input type="text" value={formData.flight_number || ''} onChange={(e) => setFormData({...formData, flight_number: e.target.value})} className="border p-2 w-full rounded" required />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Flight Date:</label>
          <input type="date" value={formData.flight_date ? formData.flight_date.split('T')[0] : ''} onChange={(e) => setFormData({...formData, flight_date: e.target.value})} className="border p-2 w-full rounded" required />
        </div>
        
        <div>
          <label className="block mb-1 text-gray-700">Aircraft:</label>
          <select value={formData.aircraft_id || ''} onChange={(e) => setFormData({...formData, aircraft_id: Number(e.target.value)})} className="border p-2 w-full rounded">
            <option value="">Select Aircraft</option>
            {aircraft.map(a => (
              <option key={a.id} value={a.id}>{a.aircraft_type}</option>
            ))}
          </select>
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">{id ? 'Update' : 'Create'} Flight</button>
          <button type="button" onClick={() => router.push('/flights')} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">Cancel</button>
        </div>
      </form>
    </div>
  );
}