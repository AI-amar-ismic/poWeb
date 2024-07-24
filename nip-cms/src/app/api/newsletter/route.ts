import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextApiResponse) {
  const secret = process.env.NEXT_PUBLIC_NEWSLETTER_SECRET;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const url = `${process.env.SENDGRID_BASE_URL}${process.env.SENDGRID_ADD_CONTACTS_PATH}`;
  const body = await new Response(req.body).json();
  if (
    Object.fromEntries(Array.from(req.headers.entries())).authorization !==
    secret
  ) {
    // res.status(401).json({ message: "Unauthorized" });
    console.log("Here");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${sendgridKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return NextResponse.json(
    { message: response.statusText },
    { status: response.status }
  );
}
