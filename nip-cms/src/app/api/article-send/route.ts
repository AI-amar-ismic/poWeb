import type { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@sendgrid/client";
import mail from "@sendgrid/mail";
import { createClient } from "@/prismicio";
import { asText, filter } from "@prismicio/client";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sendgridTemplateID = process.env.SENDGRID_DYNAMIC_TEMPLATE_ID;
  const body = await new Response(req.body).json();

  // Check if the secret is correct
  if (body.secret !== secret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Initiate the Prismic client and fetch the article from the webhook by document ID
  const prismicClient = createClient();
  const article = await prismicClient.getByType("clanak", {
    filters: [filter.at("document.id", body.documents[0])],
  });
  if (article.results.length === 0) {
    return NextResponse.json({ message: "No articles" }, { status: 403 });
  }

  // Fetch all contacts' emails from the Sendgrid API and place them in an array
  const client = new Client();
  client.setApiKey(sendgridKey || "");
  const results = await client.request({
    headers: { "Content-Type": "application/json" },
    url: "/v3/marketing/contacts",
    method: "GET",
  });
  if (results[1].statusCode !== 200) {
    return NextResponse.json({ message: "No contacts" }, { status: 500 });
  }
  const mailsArray = results[1].result.map((mail: any) => mail.email);

  // Initialize the Sendgrid client and send the email to all contacts
  mail.setApiKey(sendgridKey || "");
  const msg = {
    to: mailsArray,
    from: "novosti@narodipravda.ba",
    personalizations: [
      {
        to: mailsArray,
        dynamic_template_data: {
          saopcenjeImage: article.results[0].data.istaknuta_slika,
          title: asText(article.results[0].data.naslov),
          subtitle: asText(article.results[0].data.tekst).slice(0, 100) + "...",
          link: `https://po-web.vercel.app/vijesti/${article.results[0].uid}`,
        },
      },
    ],
    template_id: sendgridTemplateID,
    subject: "Hello world",
    text: "Hello plain world!",
    html: "<p>Hello HTML world!</p>",
  };
  mail.sendMultiple(msg);

  return NextResponse.json({ message: "Success!" }, { status: 200 });
}
