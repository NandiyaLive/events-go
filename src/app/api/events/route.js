import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function POST(request) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({
      data: data,
    });
    return new Response(JSON.stringify(event), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to create event" }), {
      status: 500,
    });
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
