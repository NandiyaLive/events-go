import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const events = await prisma.event.findMany({
      include: {
        venue: true,
        equipment: true,
        personnel: true,
      },
    });
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch events" }), {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  try {
    // Parse the request body
    const body = await req.json();

    const {
      eventName,
      startDateTime,
      endDateTime,
      venueId,
      equipmentIds,
      personnelIds,
    } = body;

    // Check if the requested venue is available during the specified time
    const venue = await prisma.venue.findUnique({
      where: { id: venueId },
    });

    if (!venue) {
      return new Response(
        JSON.stringify({ success: false, error: "Venue not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for overlapping events at the venue
    const overlappingEvents = await prisma.event.findMany({
      where: {
        venueId: venueId,
        OR: [
          {
            startDateTime: { lte: new Date(endDateTime) },
            endDateTime: { gte: new Date(startDateTime) },
          },
          {
            startDateTime: { gte: new Date(startDateTime) },
            endDateTime: { lte: new Date(endDateTime) },
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
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the requested equipment exists
    const foundEquipment = await prisma.equipment.findMany({
      where: {
        id: { in: equipmentIds },
      },
    });

    if (foundEquipment.length !== equipmentIds.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Some equipment not found",
          foundEquipment,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the requested personnel exists
    const foundPersonnel = await prisma.personnel.findMany({
      where: {
        id: { in: personnelIds },
      },
    });

    if (foundPersonnel.length !== personnelIds.length) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Some personnel not found",
          foundPersonnel,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check for overlapping equipment events
    const overlappingEquipmentEvents = await prisma.event.findMany({
      where: {
        equipment: { some: { id: { in: equipmentIds } } },
        OR: [
          {
            startDateTime: { lte: new Date(endDateTime) },
            endDateTime: { gte: new Date(startDateTime) },
          },
          {
            startDateTime: { gte: new Date(startDateTime) },
            endDateTime: { lte: new Date(endDateTime) },
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
        { status: 400, headers: { "Content-Type": "application/json" } }
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
                startDateTime: { lte: new Date(endDateTime) },
                endDateTime: { gte: new Date(startDateTime) },
              },
              {
                startDateTime: { gte: new Date(startDateTime) },
                endDateTime: { lte: new Date(endDateTime) },
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
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        eventName,
        startDateTime: new Date(startDateTime),
        endDateTime: new Date(endDateTime),
        venue: { connect: { id: venueId } },
        equipment: {
          connect: equipmentIds.map((id) => ({ id })),
        },
        personnel: {
          connect: personnelIds.map((id) => ({ id })),
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        event,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const event = await prisma.event.update({
      where: { id: data.id },
      data: data,
    });
    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to update event" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.event.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify({ message: "Event deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to delete event" }), {
      status: 500,
    });
  }
}
