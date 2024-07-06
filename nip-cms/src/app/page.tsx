import { Metadata } from "next";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { HomepageDocumentDataSlicesSlice } from "../../prismicio-types";
import LatestNews from "@/components/LatestNews";
import { Ordering } from "@prismicio/client";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("homepage", "homepage");

  return {
    title: home.data.meta_title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  //
  const client = createClient();
  const home = await client.getByUID("homepage", "homepage", {
    graphQuery: `{
    homepage{
      ...homepageFields
      slices {
        ...on home_hero {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
              items {
                ...itemsFields
              }
            }
          }
        }
        ...on newsletter {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
              items {
                ...itemsFields
              }
            }
          }
        }
        ...on nasi_ljudi {
          variation {
            ...on default {
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
        ...on citat {
          variation {
            ...on default {
              primary {
                ...primaryFields
              }
              items {
                ...itemsFields
              }
            }
          }
        }
      }
    }
   }`,
  });
  const heroSlice = home.data.slices.slice(0, 1);
  const otherSlices = home.data.slices.slice(1, undefined);
  const latestNews = await client.getAllByType("clanak", {
    limit: 3,
    orderings: { field: "document.first_publication_date", direction: "desc" },
  });

  return (
    <>
      <SliceZone slices={heroSlice} components={components} />
      <LatestNews
        title={home.data.novosti_naslov}
        subtitle={home.data.novosti_podnaslov}
        data={latestNews}
        buttonText={home.data.novosti_dugme_tekst as string}
        buttonLink={home.data.novosti_dugme_link}
      />
      <SliceZone slices={otherSlices} components={components} />
    </>
  );
}
