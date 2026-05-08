export const prerender = false;

import type { APIRoute } from "astro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();

  const ps_surname = (data.get("ps_surname") as string)?.toUpperCase();
  const ps_givnam = (data.get("ps_givnam") as string)?.toUpperCase();
  const ps_sex = (data.get("ps_sex") as string)?.toUpperCase();
  const ps_email = (data.get("ps_email") as string)?.toUpperCase();
  const ps_dbirth = (data.get("ps_dbirth") as string)?.toUpperCase();

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

        let client;
    if (existingClient) {
      client = existingClient;
    } else {
      // Crear cliente + tablas relacionadas vacías
      client = await prisma.cLIENTS.create({
        data: {
          PS_SURNAME: ps_surname,
          PS_GIVNAM: ps_givnam,
          PS_SEX: ps_sex,
          PS_EMAIL: ps_email,
          PS_DBIRTH: new Date(ps_dbirth),

          //  Relaciones con registros vacíos
          TRAVEL_INFO: { create: [{}] },
          ADDRESS: { create: [{}] },
          PASSPORT: { create: [{}] },
          FAMILY: { create: [{}] },
          PRESS_WORK: { create: [{}] },
          PREV_WORK: { create: [{}] },
          ADD_WORK: { create: [{}] },
          SECURITY: { create: [{}] },
        },
      });
    }

    return redirect(`/ds160-form?id=${client.ID_CLIENT}`);
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};