import { Metadata } from "next";
import { createClient } from "@/prismicio";
import News from "./News";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("vijesti", "vijesti");

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Vijesti({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // The client queries content from the Prismic API
  //
  const currentPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const client = createClient();
  const home = await client.getByUID("vijesti", "vijesti");
  const data = await client.getByType("clanak", {
    pageSize: 7,
    page: currentPage,
    orderings: { field: "document.first_publication_date", direction: "desc" },
  });

  return <News home={home} data={data} currentPage={currentPage} />;
}
