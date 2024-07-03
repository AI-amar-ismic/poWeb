import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("ko_smo_mi", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("ko_smo_mi", params.uid, {
      graphQuery: `{
            ko_smo_mi{
              ...ko_smo_miFields
              slices {
                ...on nasi_ljudi {
                  variation {
                    ...on page {
                      primary {
                        ...primaryFields
                      }
                      items {
                        covjek {
                          ...on nasi_ljudi {
                            slika
                            ime_prezime
                            pozicija
                          }
                        }
                      }
                    }
                  }
                }
                ...on organ {
                  variation {
                    ...on default {
                      primary {
                        ...primaryFields
                      }
                      items {
                        clan
                        pozicija
                      }
                    }
                  }
                }
                ...on image_header {
                  variation {
                    ...on default {
                      primary {
                        ...primaryFields
                      }
                    }
                  }
                }
                ...on rich_text {
                  variation {
                    ...on default {
                      primary {
                        ...primaryFields
                      }
                    }
                  }
                }
              }
            }
           }`,
    })
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("ko_smo_mi");

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
