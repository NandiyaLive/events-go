import dbConnect from "@/lib/mongo";
import Event from "@/models/event";
import Venue from "@/models/venue";
import Equipment from "@/models/equipment";

export async function POST(request) {
  try {
    await dbConnect();

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
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return new Response(
        JSON.stringify({ success: false, error: "Venue not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the requested venue is available during the specified time
    const overlappingEvents = await Event.find({
      venue: venueId,
      $or: [
        {
          startDateTime: { $lte: endDateTime },
          endDateTime: { $gte: startDateTime },
        },
        {
          startDateTime: { $gte: startDateTime },
          endDateTime: { $lte: endDateTime },
        },
      ],
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
    const unavailableEquipment = await Equipment.find({
      _id: { $in: equipmentIds },
      quantity: {
        $lt: equipmentIds.filter((id) => id.toString() === id).length,
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

    // Check for overlapping equipment
    const overlappingEquipmentEvents = await Event.find({
      equipment: { $in: equipmentIds },
      $or: [
        {
          startDateTime: { $lte: endDateTime },
          endDateTime: { $gte: startDateTime },
        },
        {
          startDateTime: { $gte: startDateTime },
          endDateTime: { $lte: endDateTime },
        },
      ],
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
    const unavailablePersonnel = await Personnel.find({
      _id: { $in: personnelIds },
      $or: [
        {
          $expr: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$events",
                    cond: {
                      $and: [
                        { $gte: ["$$this.startDateTime", startDateTime] },
                        { $lte: ["$$this.endDateTime", endDateTime] },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      ],
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
