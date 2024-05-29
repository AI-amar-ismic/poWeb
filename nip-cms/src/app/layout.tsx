import { PrismicNextImage, PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import "../styles/reset.css";
import styles from "./layout.module.scss";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const navbar = await client.getByUID("navbar", "navbar");
  const data = navbar.data;
  return (
    <html lang="en" className={font.className}>
      <body className={styles.body}>
        <Navbar data={navbar.data} />
        {children}
      </body>
      <SpeedInsights />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
