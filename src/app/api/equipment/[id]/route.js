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

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await prisma.equipment.delete({
      where: { id: id },
    });
    return new Response(JSON.stringify({ message: "Equipment deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to delete equipment" }),
      { status: 500 }
    );
  }
}
