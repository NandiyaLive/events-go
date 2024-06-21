import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const personnels = await prisma.personnel.findMany({
      include: {
        events: true,
      },
    });
    return new Response(JSON.stringify(personnels), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch personnels" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const personnel = await prisma.personnel.create({
      data: data,
    });
    return new Response(JSON.stringify(personnel), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to create personnel" }),
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const personnel = await prisma.personnel.update({
      where: { id: data.id },
      data: data,
    });
    return new Response(JSON.stringify(personnel), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to update personnel" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.personnel.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify({ message: "Personnel deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to delete personnel" }),
      { status: 500 }
    );
  }
}
