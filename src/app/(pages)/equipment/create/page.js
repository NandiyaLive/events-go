"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateEquipmentPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/equipment", {
        ...data,
        quantity: parseInt(data.quantity),
      });
      reset();
      router.push("/equipment");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Create Equipment</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Equipment Name</label>
          <input
            {...register("equipmentName", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">Equipment Type</label>
          <input
            {...register("equipmentType", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">Quantity</label>
          <input
            type="number"
            {...register("quantity", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Equipment"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateEquipmentPage;
