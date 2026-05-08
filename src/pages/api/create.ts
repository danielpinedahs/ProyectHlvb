export const prerender = false;

import type { APIRoute } from "astro";
import { prisma } from "../../lib/prisma";

function safeJson(data: any) {
  return JSON.stringify(
    data,
    (_, value) =>
      typeof value === "bigint"
        ? value.toString()
        : value
  );
}

export const POST: APIRoute = async ({ request }) => {

  const body = await request.json();

  const client = await prisma.cLIENTS.create({
    data: {
      PS_SURNAME: body.ps_surname,
      PS_GIVNAM: body.ps_givnam,
      PS_SEX: body.ps_sex,
      PS_EMAIL: body.ps_email,
      PS_DBIRTH: new Date(body.ps_dbirth)
    }
  });

  return new Response(
    safeJson({
      client: {
        ID_CLIENT: client.ID_CLIENT,
        PS_GIVNAM: client.PS_GIVNAM,
        PS_SURNAME: client.PS_SURNAME,
        PS_EMAIL: client.PS_EMAIL,
        PS_SEX: client.PS_SEX,
        PS_DBIRTH: client.PS_DBIRTH
      },
      applications: []
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};