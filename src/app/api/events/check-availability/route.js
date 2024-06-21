import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    // Parse the request body
    const {
      eventName,
      startDateTime,
      endDateTime,
      venueId,
      equipmentIds,
      personnelIds,
    } = await request.json();

    // Check if the requested venue is available during the specified time
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
    });

    if (!venue) {
      return new Response(
        JSON.stringify({ success: false, error: "Venue not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for overlapping events at the venue
    const overlappingEvents = await prisma.event.findMany({
      where: {
        venueId: venueId,
        OR: [
          {
            startDateTime: { lte: endDateTime },
            endDateTime: { gte: startDateTime },
          },
          {
            startDateTime: { gte: startDateTime },
            endDateTime: { lte: endDateTime },
          },
        ],
      },
    });

    if (overlappingEvents.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Venue is not available during the specified time",
          overlappingEvents,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the requested equipment is available
    const unavailableEquipment = await prisma.equipment.findMany({
      where: {
        id: { in: equipmentIds },
        quantity: {
          lt: equipmentIds.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          }, {}),
        },
      },
    });

    if (unavailableEquipment.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Not enough equipment available",
          unavailableEquipment,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for overlapping equipment events
    const overlappingEquipmentEvents = await prisma.event.findMany({
      where: {
        equipment: { some: { id: { in: equipmentIds } } },
        OR: [
          {
            startDateTime: { lte: endDateTime },
            endDateTime: { gte: startDateTime },
          },
          {
            startDateTime: { gte: startDateTime },
            endDateTime: { lte: endDateTime },
          },
        ],
      },
    });

    if (overlappingEquipmentEvents.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Some equipment is not available during the specified time",
          overlappingEquipmentEvents,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the requested personnel is available
    const unavailablePersonnel = await prisma.personnel.findMany({
      where: {
        id: { in: personnelIds },
        events: {
          some: {
            OR: [
              {
                startDateTime: { lte: endDateTime },
                endDateTime: { gte: startDateTime },
              },
              {
                startDateTime: { gte: startDateTime },
                endDateTime: { lte: endDateTime },
              },
            ],
          },
        },
      },
    });

    if (unavailablePersonnel.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Some personnel is not available during the specified time",
          unavailablePersonnel,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `${eventName} can be hosted at the requested venue during the specified time with the requested equipment and personnel`,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
