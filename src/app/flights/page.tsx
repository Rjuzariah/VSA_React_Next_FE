'use client';

import { useState, useEffect } from 'react';

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  aircraftId: string;
}

interface Aircraft {
  id: string;
  model: string;
  registrationNumber: string;
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [formData, setFormData] = useState<Partial<Flight>>({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    aircraftId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchFlights();
    fetchAircraft();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch('/api/flights');
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

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
      const url = isEditing ? `/api/flights/${editId}` : '/api/flights';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchFlights();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await fetch(`/api/flights/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchFlights();
        }
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    }
  };

  const handleEdit = (flight: Flight) => {
    setFormData(flight);
    setIsEditing(true);
    setEditId(flight.id);
  };

  const resetForm = () => {
    setFormData({
      flightNumber: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      aircraftId: ''
    });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flight Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-1">Flight Number:</label>
          <input
            type="text"
            value={formData.flightNumber}
            onChange={(e) => setFormData({...formData, flightNumber: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Origin:</label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => setFormData({...formData, origin: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Destination:</label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({...formData, destination: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Departure Time:</label>
          <input
            type="datetime-local"
            value={formData.departureTime}
            onChange={(e) => setFormData({...formData, departureTime: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Arrival Time:</label>
          <input
            type="datetime-local"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({...formData, arrivalTime: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Aircraft:</label>
          <select
            value={formData.aircraftId}
            onChange={(e) => setFormData({...formData, aircraftId: e.target.value})}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Aircraft</option>
            {aircraft.map((item) => (
              <option key={item.id} value={item.id}>
                {item.model} - {item.registrationNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update' : 'Create'} Flight
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
              <th className="border p-2">Flight Number</th>
              <th className="border p-2">Origin</th>
              <th className="border p-2">Destination</th>
              <th className="border p-2">Departure</th>
              <th className="border p-2">Arrival</th>
              <th className="border p-2">Aircraft</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td className="border p-2">{flight.flightNumber}</td>
                <td className="border p-2">{flight.origin}</td>
                <td className="border p-2">{flight.destination}</td>
                <td className="border p-2">{new Date(flight.departureTime).toLocaleString()}</td>
                <td className="border p-2">{new Date(flight.arrivalTime).toLocaleString()}</td>
                <td className="border p-2">
                  {aircraft.find(a => a.id === flight.aircraftId)?.registrationNumber}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(flight)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.id)}
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