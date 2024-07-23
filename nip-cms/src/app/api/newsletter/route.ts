import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// type ResponseData = {
//   message: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   const secret = process.env.NEWSLETTER_SECRET;
//   if (req.headers.authorization !== secret) {
//     res.status(401).json({ message: "Unauthorized" });
//   } else {
//     fetch("https://api.sendgrid.com/v3/marketing/contacts", {
//       method: "PUT",
//       headers: {
//         Authorization:
//           "Bearer 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",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(req.body),
//     }).then((response) => console.log(response));
//   }
//   res.status(200).json({ message: "Hello from Next.js!" });
// }

export async function PUT(req: NextRequest, res: NextApiResponse) {
  const secret = process.env.NEXT_PUBLIC_NEWSLETTER_SECRET;
  const body = await new Response(req.body).json();
  if (
    Object.fromEntries(Array.from(req.headers.entries())).authorization !==
    secret
  ) {
    // res.status(401).json({ message: "Unauthorized" });
    console.log("Here");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const response = await fetch(
    "https://api.sendgrid.com/v3/marketing/contacts",
    {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
