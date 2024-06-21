"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreateEventPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [venues, setVenues] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [venuesResponse, equipmentResponse, personnelResponse] =
          await Promise.all([
            axios.get("/api/venues"),
            axios.get("/api/equipment"),
            axios.get("/api/personnel"),
          ]);

        setVenues(venuesResponse.data);
        setEquipment(equipmentResponse.data);
        setPersonnel(personnelResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/event", data);
      reset();
      router.push("/events");
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
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Event Name</label>
          <input
            {...register("eventName", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">Start Date and Time</label>
          <input
            type="datetime-local"
            {...register("startDateTime", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">End Date and Time</label>
          <input
            type="datetime-local"
            {...register("endDateTime", { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2">Venue</label>
          {venues.map((venue) => (
            <div key={venue.id} className="flex items-center">
              <input
                type="checkbox"
                {...register("venueId")}
                value={venue.id}
                className="mr-2"
              />
              <span>{venue.venueName}</span>
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-2">Equipment</label>
          {equipment.map((eq) => (
            <div key={eq.id} className="flex items-center">
              <input
                type="checkbox"
                {...register("equipmentIds")}
                value={eq.id}
                className="mr-2"
              />
              <span>{eq.equipmentName}</span>
            </div>
          ))}
        </div>

        <div>
          <label className="block mb-2">Personnel</label>
          {personnel.map((person) => (
            <div key={person.id} className="flex items-center">
              <input
                type="checkbox"
                {...register("personnelIds")}
                value={person.id}
                className="mr-2"
              />
              <span>{person.name}</span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
