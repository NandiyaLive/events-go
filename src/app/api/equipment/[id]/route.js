import prisma from "@/lib/prisma";

export async function PATCH(request) {
  try {
    const data = await request.json();
    const equipment = await prisma.equipment.update({
      where: { id: data.id },
      data: data,
    });
    return new Response(JSON.stringify(equipment), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to update equipment" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const equipmentId = params.id;

  try {
    await prisma.equipment.delete({
      where: { id: equipmentId },
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
