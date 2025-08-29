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

    const clientID =
      existingClient?.ID_CLIENT ??
      (
        await prisma.cLIENTS.create({
          data: {
            PS_SURNAME: ps_surname,
            PS_GIVNAM: ps_givnam,
            PS_SEX: ps_sex,
            PS_EMAIL: ps_email,
            PS_DBIRTH: new Date(ps_dbirth),
          },
        })
      ).ID_CLIENT;

    return redirect(`/form-ds160?id=${clientID}`);
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
