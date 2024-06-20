import dbConnect from "@/lib/mongo";
import Equipment from "@/models/equipment";

export async function GET(request) {
  try {
    await dbConnect();
    const equipment = await Equipment.find({});
    return new Response(JSON.stringify({ success: true, data: equipment }), {
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
    const newEquipment = await Equipment.create(body);
    return new Response(JSON.stringify({ success: true, data: newEquipment }), {
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
