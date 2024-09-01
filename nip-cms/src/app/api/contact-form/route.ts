import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import mail from "@sendgrid/mail";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const body = await new Response(req.body).json();
  const { name, email, telefon, prebivaliste, poruka } = body;

  // Initialize the Sendgrid client and send the email to all contacts
  mail.setApiKey(sendgridKey || "");
  const msg = {
    to: "info@narodipravda.ba",
    from: "novosti@narodipravda.ba",
    subject: "Novi upit na webu",
    text: "Hello plain world!",
    replyTo: email,
    html: `<table style="border-collapse: collapse; width: 100%; height: 90px;" border="1">
<tbody>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Ime i prezime</td>
<td style="width: 50%; height: 18px;">${name}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">E-mail</td>
<td style="width: 50%; height: 18px;">${email}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Broj telefona</td>
<td style="width: 50%; height: 18px;">${telefon}</td>
</tr>
<tr style="height: 18px;">
<td style="width: 50%; height: 18px;">Mjesto prebivali&scaron;ta</td>
<td style="width: 50%; height: 18px;">${prebivaliste}</td>
</tr>
</tbody>
</table>
<p style="text-align: left;">Poruka:</p>
<p style="text-align: left;">${poruka}</p>`,
  };
  await mail.send(msg);
  return NextResponse.json({ message: "Success!" }, { status: 200 });
}
