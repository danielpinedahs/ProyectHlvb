export const prerender = false;

import type { APIRoute } from "astro";
import { prisma } from "../../lib/prisma";

function safeJson(obj: any) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const id = data.get("id");

  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "ID requerido" }),
      { status: 400 }
    );
  }

  try {
    const client = await prisma.cLIENTS.update({
      where: { ID_CLIENT: BigInt(id as string) },
      data: {
        PS_SURNAME: (data.get("ps_surname") as string)?.toUpperCase(),
        PS_GIVNAM: (data.get("ps_givnam") as string)?.toUpperCase(),
        PS_FULLNAME: (data.get("ps_fullname") as string)?.toUpperCase(),
        PS_QST1:(data.get("ps_qst1") as string)?.toUpperCase(),
        PS_OSURN: (data.get("ps_osurn") as string)?.toUpperCase(),
        PS_OGIVN: (data.get("ps_ogivn") as string)?.toUpperCase(),
        PS_SEX: (data.get("ps_sex") as string)?.toUpperCase(),
        PS_TELCOD: (data.get("ps_telecod") as string)?.toUpperCase(),
        PS_MARITAL: (data.get("ps_marital") as string)?.toUpperCase(),
        PS_EMAIL: (data.get("ps_email") as string)?.toUpperCase(),
        PS_DBIRTH: data.get("ps_dbirth") ? new Date(data.get("ps_dbirth") as string) : null,
        PS_DCITY: (data.get("ps_dcity") as string)?.toUpperCase(),
        PS_DSTATE: (data.get("ps_dstate") as string)?.toUpperCase(),
        PS_COUNTRY: (data.get("ps_country") as string)?.toUpperCase(),
        PS_OCOUNTRY: (data.get("ps_ocountry") as string)?.toUpperCase(),
        PS_HOLD: (data.get("ps_hold") as string)?.toUpperCase(),
        PS_HOCCOUNTRY: (data.get("ps_hoccountry") as string)?.toUpperCase(),
        PS_RESIDENT: (data.get("ps_resident") as string)?.toUpperCase(),
        PS_RCOUNTRY:(data.get("ps_rcountry") as string)?.toUpperCase(),
        PS_PASSHOLD: (data.get("ps_passhold") as string)?.toUpperCase(),
        PS_IDENTITY: (data.get("ps_identity") as string)?.toUpperCase(),
        PS_SECNUMBER: (data.get("ps_secnumber") as string)?.toUpperCase(),
        PS_TAXNUMBER: (data.get("ps_taxnumber") as string)?.toUpperCase(),
      },
    });

    return new Response(safeJson({ success: true, client }), { status: 200 });
  } catch (error) {
    console.error("❌ Data not updated:", error); 
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500 }
    );
  }
};