// src/pages/api/clientes.ts
export const prerender = false;
import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();

  const ps_surname = data.get("ps_surname") as string;
  const ps_givnam = data.get("ps_givnam") as string;
  const ps_sex = data.get("ps_sex") as string;
  const ps_email = data.get("ps_email") as string;
  const ps_dbirth = data.get("ps_dbirth") as string;

  // 1. Buscar si el cliente ya existe
  try {
    const existingClient = await prisma.cLIENTS.findFirst({
      where: {
        PS_SURNAME: ps_surname,
        PS_GIVNAM: ps_givnam,
        PS_SEX: ps_sex,
        PS_EMAIL: ps_email,
        PS_DBIRTH: new Date(ps_dbirth),
      },
    });

    if (existingClient) {
      // 2. Si existe, redirigir a la página del formulario completo,
      //    pasando los datos como parámetros de la URL.
      //    Esto se llama una redirección con query parameters.
      const queryString = new URLSearchParams({
        ps_surname,
        ps_givnam,
        ps_sex,
        ps_email,
        ps_dbirth,
        id: String(existingClient.ID_CLIENT), // Pasa el ID del cliente para futuras actualizaciones
      }).toString();

      return redirect(`/form-ds160?${queryString}`);
    }

    // 3. Si no existe, crear el nuevo registro
    const newClient = await prisma.cLIENTS.create({
      data: {
        PS_SURNAME: ps_surname,
        PS_GIVNAM: ps_givnam,
        PS_SEX: ps_sex,
        PS_EMAIL: ps_email,
        PS_DBIRTH: new Date(ps_dbirth),
      },
    });
    console.log("Nuevo cliente creado:", newClient);

    // Redirige a la página del formulario completo con el nuevo ID
    return redirect(`/form-ds160?id=${newClient.ID_CLIENT}`);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};