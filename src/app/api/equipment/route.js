import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const equipments = await prisma.equipment.findMany({
      include: {
        events: true,
      },
    });
    return new Response(JSON.stringify(equipments), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch equipments" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const equipment = await prisma.equipment.create({
      data: data,
    });
    return new Response(JSON.stringify(equipment), { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ error: "Unable to create equipment" }),
      { status: 500 }
    );
  }
}
