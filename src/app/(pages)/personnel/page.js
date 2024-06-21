"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PersonnelPage = () => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await axios.get("/api/personnel");
        setPersonnel(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPersonnel();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/personnel/${id}`);
      const updatedPersonnel = personnel.filter((p) => p.id !== id);
      setPersonnel(updatedPersonnel);
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
      <h1 className="text-3xl font-bold mb-6">Personnel</h1>
      <Link
        href="/personnel/create"
        className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Personnel
      </Link>
      <ul className="space-y-4">
        {personnel.map((p) => (
          <li
            key={p.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p>{p.role}</p>
            </div>
            <div>
              <button
                onClick={() => handleDelete(p.id)}
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

export default PersonnelPage;
