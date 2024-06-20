import dbConnect from "@/lib/mongo";
import Event from "@/models/event";

export async function GET(request) {
  try {
    await dbConnect();

    const events = await Event.find({});

    return new Response(JSON.stringify({ success: true, data: events }), {
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

    const newEvent = await Event.create(body);

    return new Response(JSON.stringify({ success: true, data: newEvent }), {
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
