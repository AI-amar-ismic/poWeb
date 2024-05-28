import { PrismicNextImage, PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const navbar = await client.getByUID("navbar", "navbar");
  const data = navbar.data;
  return (
    <html lang="en">
      <body>
        <Navbar data={navbar.data} />
        {children}
      </body>
      <SpeedInsights />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
