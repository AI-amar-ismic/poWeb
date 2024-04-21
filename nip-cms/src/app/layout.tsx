import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <SpeedInsights />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
