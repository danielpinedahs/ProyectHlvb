// src/pages/api/clientes-actualizar.ts
import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const id = Number(data.get("id"));

  if (!id) {
    return new Response("ID del cliente no encontrado.", { status: 400 });
  }

  // Mapea todos los campos que quieras actualizar
  const updateData: any = {};
  for (const [key, value] of data.entries()) {
    if (key !== "id" && value !== "") {
      updateData[key.toUpperCase()] = value;
    }
  }

  try {
    const updatedClient = await prisma.cLIENTS.update({
      where: { ID_CLIENT: id },
      data: updateData,
    });
    console.log("Cliente actualizado:", updatedClient);
    return redirect("/actualizacion-exitosa"); // Redirige a una página de éxito
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    return new Response("Error al actualizar el cliente.", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};