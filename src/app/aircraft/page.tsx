'use client';

import { useState, useEffect } from 'react';

interface Aircraft {
  id: string;
  model: string;
  manufacturer: string;
  capacity: number;
  registrationNumber: string;
}

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [formData, setFormData] = useState<Partial<Aircraft>>({
    model: '',
    manufacturer: '',
    capacity: 0,
    registrationNumber: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch aircraft data
  useEffect(() => {
    fetchAircraft();
  }, []);

  const fetchAircraft = async () => {
    try {
      const response = await fetch('/api/aircraft');
      if (response.ok) {
        const data = await response.json();
        setAircraft(data);
      }
    } catch (error) {
      console.error('Error fetching aircraft:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/aircraft/${editId}` : '/api/aircraft';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchAircraft();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving aircraft:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        const response = await fetch(`/api/aircraft/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchAircraft();
        }
      } catch (error) {
        console.error('Error deleting aircraft:', error);
      }
    }
  };

  const handleEdit = (aircraft: Aircraft) => {
    setFormData(aircraft);
    setIsEditing(true);
    setEditId(aircraft.id);
  };

  const resetForm = () => {
    setFormData({
      model: '',
      manufacturer: '',
      capacity: 0,
      registrationNumber: ''
    });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aircraft Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-1">Model:</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({...formData, model: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Manufacturer:</label>
          <input
            type="text"
            value={formData.manufacturer}
            onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Capacity:</label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Registration Number:</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update' : 'Create'} Aircraft
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">Model</th>
              <th className="border p-2">Manufacturer</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Registration</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {aircraft.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.model}</td>
                <td className="border p-2">{item.manufacturer}</td>
                <td className="border p-2">{item.capacity}</td>
                <td className="border p-2">{item.registrationNumber}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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