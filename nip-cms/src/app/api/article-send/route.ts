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
  const article = await prismicClient.getSingle("clanak", {
    filters: [filter.at("document.id", body.documents[0])],
  });
  // const article = await prismicClient.getByType("clanak", {
  //   filters: [filter.at("document.id", body.documents[0])],
  // });
  console.log(article);
  if (
    // check if the article exists
    article &&
    // prismic sends webhooks for all documents, we only want articles
    // article.results[0].type === "clanak" &&
    // prismic sends webhooks for all changes, we only want new articles
    article.first_publication_date === article.last_publication_date
  ) {
    // Fetch all contacts' emails from the Sendgrid API and place them in an array
    const client = new Client();
    client.setApiKey(sendgridKey || "");
    const results = await client.request({
      headers: { "Content-Type": "application/json" },
      url: "/v3/marketing/contacts",
      method: "GET",
    });
    if (results[0].statusCode === 500) {
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
            saopcenjeImage: article.data.istaknuta_slika,
            title: asText(article.data.naslov),
            subtitle: asText(article.data.tekst).slice(0, 300) + "...",
            link: `https://narodipravda.ba/vijesti/${article.uid}`,
          },
        },
      ],
      template_id: sendgridTemplateID,
      subject: "Hello world",
      text: "Hello plain world!",
      html: "<p>Hello HTML world!</p>",
    };
    await mail.send(msg);
    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Not valid" }, { status: 403 });
  }
}
