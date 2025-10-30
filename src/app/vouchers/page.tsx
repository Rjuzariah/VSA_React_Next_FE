'use client';

import { useState, useEffect } from 'react';

interface Voucher {
  id: string;
  code: string;
  flightId: string;
  seatNumber: string;
  passengerName: string;
  status: 'active' | 'used' | 'expired';
  expirationDate: string;
}

interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
}

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [formData, setFormData] = useState<Partial<Voucher>>({
    code: '',
    flightId: '',
    seatNumber: '',
    passengerName: '',
    status: 'active',
    expirationDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchVouchers();
    fetchFlights();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await fetch('/api/vouchers');
      if (response.ok) {
        const data = await response.json();
        setVouchers(data);
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/vouchers/${editId}` : '/api/vouchers';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchVouchers();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving voucher:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this voucher?')) {
      try {
        const response = await fetch(`/api/vouchers/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchVouchers();
        }
      } catch (error) {
        console.error('Error deleting voucher:', error);
      }
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setFormData(voucher);
    setIsEditing(true);
    setEditId(voucher.id);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      flightId: '',
      seatNumber: '',
      passengerName: '',
      status: 'active',
      expirationDate: ''
    });
    setIsEditing(false);
    setEditId(null);
  };

  const generateVoucherCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData({ ...formData, code: randomCode });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voucher Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-1">Voucher Code:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="border p-2 flex-1 rounded"
              required
            />
            <button
              type="button"
              onClick={generateVoucherCode}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Generate
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1">Flight:</label>
          <select
            value={formData.flightId}
            onChange={(e) => setFormData({...formData, flightId: e.target.value})}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Flight</option>
            {flights.map((flight) => (
              <option key={flight.id} value={flight.id}>
                {flight.flightNumber} ({flight.origin} - {flight.destination})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Seat Number:</label>
          <input
            type="text"
            value={formData.seatNumber}
            onChange={(e) => setFormData({...formData, seatNumber: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Passenger Name:</label>
          <input
            type="text"
            value={formData.passengerName}
            onChange={(e) => setFormData({...formData, passengerName: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'used' | 'expired'})}
            className="border p-2 w-full rounded"
            required
          >
            <option value="active">Active</option>
            <option value="used">Used</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Expiration Date:</label>
          <input
            type="datetime-local"
            value={formData.expirationDate}
            onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update' : 'Create'} Voucher
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
              <th className="border p-2">Code</th>
              <th className="border p-2">Flight</th>
              <th className="border p-2">Seat</th>
              <th className="border p-2">Passenger</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Expires</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="border p-2">{voucher.code}</td>
                <td className="border p-2">
                  {flights.find(f => f.id === voucher.flightId)?.flightNumber}
                </td>
                <td className="border p-2">{voucher.seatNumber}</td>
                <td className="border p-2">{voucher.passengerName}</td>
                <td className="border p-2">
                  <span className={`
                    px-2 py-1 rounded text-white
                    ${voucher.status === 'active' ? 'bg-green-500' : ''}
                    ${voucher.status === 'used' ? 'bg-gray-500' : ''}
                    ${voucher.status === 'expired' ? 'bg-red-500' : ''}
                  `}>
                    {voucher.status}
                  </span>
                </td>
                <td className="border p-2">{new Date(voucher.expirationDate).toLocaleString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(voucher)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(voucher.id)}
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