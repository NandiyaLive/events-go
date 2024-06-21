"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("/api/equipment");
        setEquipment(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/equipment/${id}`);
      const updatedEquipment = equipment.filter((eq) => eq.id !== id);
      setEquipment(updatedEquipment);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Equipment</h1>
      <Link
        href="/equipment/create"
        className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Equipment
      </Link>
      <ul className="space-y-4">
        {equipment.map((eq) => (
          <li
            key={eq.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{eq.equipmentName}</h2>
              <p>{eq.description}</p>
              <p>Quantity: {eq.quantity}</p>
            </div>
            <div>
              <button
                onClick={() => handleDelete(eq.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentPage;
