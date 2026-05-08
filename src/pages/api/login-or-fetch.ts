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

  console.log("BODY:", body);

  const client = await prisma.cLIENTS.findFirst({
    where: {
      PS_EMAIL: body.ps_email
    }
  });

  // 🔴 cliente no existe
  if (!client) {
    return new Response(
      safeJson({
        found: false
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  // 🟢 cliente existe
  return new Response(
    safeJson({
      found: true,
      client: {
        id: client.ID_CLIENT,
        surname: client.PS_SURNAME,
        name: client.PS_GIVNAM,
        sex: client.PS_SEX,
        email: client.PS_EMAIL,
        birth: client.PS_DBIRTH
      }
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};