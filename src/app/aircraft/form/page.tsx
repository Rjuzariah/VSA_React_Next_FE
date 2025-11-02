'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAircraftById, createAircraft, updateAircraft } from '@/services/aircraft.service';

export default function AircraftFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [formData, setFormData] = useState<Partial<Aircraft>>({
    aircraft_type: '',
    num_rows: 0,
    seats_per_row: ''
  });

  useEffect(() => {
    if (id) {
      fetchAircraft(id);
    }
  }, [id]);

  const fetchAircraft = async (aircraftId: string) => {
    try {
      const data = await getAircraftById(aircraftId);
      setFormData(data);
    } catch (error) {
      console.error('Error fetching aircraft:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateAircraft(id, formData as Omit<Aircraft, 'id'>);
      } else {
        await createAircraft(formData as Omit<Aircraft, 'id'>);
      }
      router.push('/aircraft');
    } catch (error) {
      console.error('Error saving aircraft:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? 'Edit Aircraft' : 'Add New Aircraft'}
        </h1>
        <button
          onClick={() => router.push('/aircraft')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">
            Aircraft Type: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.aircraft_type}
            onChange={(e) => setFormData({...formData, aircraft_type: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">
            Number of Rows: <span className="text-red-500">*</span>
            </label>
          <input
            type="number"
            value={formData.num_rows}
            onChange={(e) => setFormData({...formData, num_rows: parseInt(e.target.value)})}
            className="border p-2 w-full rounded"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">
            Seats Per Row:
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.seats_per_row?.toUpperCase()}
            onChange={(e) => setFormData({...formData, seats_per_row: e.target.value})}
            className="border p-2 w-full rounded"
            placeholder="e.g., ABCDEF"
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            {id ? 'Update' : 'Create'} Aircraft
          </button>
          <button
            type="button"
            onClick={() => router.push('/aircraft')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}