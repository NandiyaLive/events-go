import prisma from "@/lib/prisma";

export async function PATCH(req) {
  const venueId = parseInt(req.query.id);
  const data = await req.json();

  try {
    const venue = await prisma.venue.update({
      where: { id: venueId },
      data: data,
    });

    return new Response(JSON.stringify(venue), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  const venueId = req.query.id;

  try {
    await prisma.venue.delete({
      where: { id: venueId },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
