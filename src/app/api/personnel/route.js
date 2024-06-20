import dbConnect from "@/lib/mongo";
import Personnel from "@/models/personnel";

export async function GET(request) {
  try {
    await dbConnect();
    const personnel = await Personnel.find({});
    return new Response(JSON.stringify({ success: true, data: personnel }), {
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
    const newPersonnel = await Personnel.create(body);
    return new Response(JSON.stringify({ success: true, data: newPersonnel }), {
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
