"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      <Link
        href="/events/create"
        className="inline-block px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Event
      </Link>

      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-2xl font-semibold mb-2">{event.eventName}</h2>
            <p>
              <strong>Start:</strong>{" "}
              {new Date(event.startDateTime).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {new Date(event.endDateTime).toLocaleString()}
            </p>
            <p>
              <strong>Venue:</strong> {event.venue.venueName}
            </p>
            <p>
              <strong>Equipment:</strong>{" "}
              {event.equipment.map((eq) => eq.equipmentName).join(", ")}
            </p>
            <p>
              <strong>Personnel:</strong>{" "}
              {event.personnel.map((person) => person.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
