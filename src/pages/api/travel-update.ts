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
    const client = await prisma.tRAVEL_INFO.update({
      where: { ID_TRAVEL: Number(id) },
      data: {
        PTI_BEEN: (data.get("pti_been") as string)?.toUpperCase(),

        PTI_DATE1: data.get("pti_date1") ? new Date(data.get("pti_date1") as string) : null,
        PTI_LEN1: (data.get("pti_len1") as string)?.toUpperCase(),

        PTI_DATE2: data.get("pti_date2") ? new Date(data.get("pti_date2") as string) : null,
        PTI_LEN2: (data.get("pti_len2") as string)?.toUpperCase(),

        PTI_DATE3: data.get("pti_date3") ? new Date(data.get("pti_date3") as string) : null,
        PTI_LEN3: (data.get("pti_len3") as string)?.toUpperCase(),

        PTI_DATE4: data.get("pti_date4") ? new Date(data.get("pti_date4") as string) : null,
        PTI_LEN4: (data.get("pti_len4") as string)?.toUpperCase(),

        PTI_DATE5: data.get("pti_date5") ? new Date(data.get("pti_date5") as string) : null,
        PTI_LEN5: (data.get("pti_len5") as string)?.toUpperCase(),

        PTI_HOLDRIVER: (data.get("pti_holdriver") as string)?.toUpperCase(),
        PTI_LICENSE: (data.get("pti_license") as string)?.toUpperCase(),
        PTI_SLICENSE: (data.get("pti_slicense") as string)?.toUpperCase(),
        PTI_ISSUEDV: (data.get("pti_issuedv") as string)?.toUpperCase(),

        PTI_DATEISSUED: data.get("pti_dateissued") ? new Date(data.get("pti_dateissued") as string) : null,
        PTI_DATEXPIRED: data.get("pti_datexpired") ? new Date(data.get("pti_datexpired") as string) : null,

        PTI_REDNUMBER: (data.get("pti_rednumber") as string)?.toUpperCase(),
        PTI_SAMEVISA: (data.get("pti_samevisa") as string)?.toUpperCase(),
        PTI_SAMECNT: (data.get("pti_samecnt") as string)?.toUpperCase(),
        PTI_TENPRINTED: (data.get("pti_tenprinted") as string)?.toUpperCase(),
        PTI_LOST: (data.get("pti_lost") as string)?.toUpperCase(),

        PTI_QST1: (data.get("pti_qst1") as string)?.toUpperCase(),
        PTI_RST1: (data.get("pti_rst1") as string)?.toUpperCase(),

        PTI_QST2: (data.get("pti_qst2") as string)?.toUpperCase(),
        PTI_RST2: (data.get("pti_rst2") as string)?.toUpperCase(),

        PTI_QST3: (data.get("pti_qst3") as string)?.toUpperCase(),
        PTI_RST3: (data.get("pti_rst3") as string)?.toUpperCase(),

        PTI_QST4: (data.get("pti_qst4") as string)?.toUpperCase(),
        PTI_RST4: (data.get("pti_rst4") as string)?.toUpperCase(),

        PTI_QST5: (data.get("pti_qst5") as string)?.toUpperCase(),
        PTI_RST5: (data.get("pti_rst5") as string)?.toUpperCase(),
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
