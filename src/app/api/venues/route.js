import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const venues = await prisma.venue.findMany({
      include: {
        events: true,
      },
    });
    return new Response(JSON.stringify(venues), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to fetch venues" }), {
      status: 500,
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const venue = await prisma.venue.create({
      data: data,
    });
    return new Response(JSON.stringify(venue), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to create venue" }), {
      status: 500,
    });
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const venue = await prisma.venue.update({
      where: { id: data.id },
      data: data,
    });
    return new Response(JSON.stringify(venue), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to update venue" }), {
      status: 500,
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.venue.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify({ message: "Venue deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unable to delete venue" }), {
      status: 500,
    });
  }
}
