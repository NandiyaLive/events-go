import dbConnect from "@/lib/mongo";
import Venue from "@/models/venue";

export async function GET(request) {
  try {
    await dbConnect();
    const venues = await Venue.find({});
    return new Response(JSON.stringify({ success: true, data: venues }), {
      headers: { "Content-Type": "application/json" },
    });
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

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newVenue = await Venue.create(body);
    return new Response(JSON.stringify({ success: true, data: newVenue }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
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
