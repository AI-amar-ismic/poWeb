import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { filter } from "@prismicio/client";
import styles from "./page.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import NewsCard from "@/components/NewsCard";
import { ClanakDocument } from "../../../../prismicio-types";
import wordpressRedirects from "../../../../redirects";
import { notFound, permanentRedirect, redirect } from "next/navigation";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const article: any = await client.getByUID("clanak", params.uid);

  const title = article.data.naslov[0]?.text ?? "";
  const description = article.data.tekst[0]?.text.slice(0, 150) ?? "";
  const imageUrl = article.data.istaknuta_slika.url ?? "";
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [{ url: imageUrl }],
    },
  };
}

export default async function Vijest({ params }: { params: Params }) {
  // The client queries content from the Prismic API
  //

  const client = createClient();
  const home = await client.getAllByUIDs("clanak", [params.uid]);
  if (home.length > 0) {
    const relatedArticles = await client.getAllBySomeTags<ClanakDocument>(
      home[0].tags,
      {
        limit: 3,
        filters: [
          filter.at("document.type", "clanak"),
          filter.not("document.id", home[0].id),
        ],
      }
    );

    const getDate = () => {
      const date = new Date(
        home[0].data.originalni_datum || home[0].first_publication_date
      );
      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.articleContainer}>
            <p
              className={styles.articleMetaInfo}
            >{`${getDate()} / PRESS NARODA I PRAVDE`}</p>
            <div className={styles.article}>
              <PrismicRichText
                field={home[0].data.naslov}
                components={{
                  heading1: ({ children }) => {
                    return <h1 className={styles.title}>{children}</h1>;
                  },
                }}
              />
              <PrismicNextImage
                field={home[0].data.istaknuta_slika}
                className={styles.image}
                priority
              />
              <div className={styles.textContainer}>
                <PrismicRichText
                  field={home[0].data.tekst}
                  components={{
                    heading1: ({ children }) => {
                      return <h1 className={styles.title}>{children}</h1>;
                    },
                    paragraph: ({ children }) => {
                      return <p className={styles.paragraph}>{children}</p>;
                    },
                    strong: ({ children }) => {
                      return (
                        <p className={styles.paragraphStrong}>{children}</p>
                      );
                    },
                    em: ({ children }) => {
                      return <p className={styles.paragraphEm}>{children}</p>;
                    },
                    list: ({ children }) => {
                      return <ul className={styles.list}>{children}</ul>;
                    },
                    oList: ({ children }) => {
                      return <ol className={styles.oList}>{children}</ol>;
                    },
                    listItem: ({ children }) => {
                      return <li className={styles.listItem}>{children}</li>;
                    },
                    oListItem: ({ children }) => {
                      return <li className={styles.oListItem}>{children}</li>;
                    },
                    image: ({ node }) => {
                      return (
                        <img
                          className={styles.articleImage}
                          src={node.url}
                          alt={node.alt ?? ""}
                        />
                      );
                    },
                  }}
                />
              </div>
            </div>
          </div>
          {relatedArticles && relatedArticles.length > 0 && (
            <div className={styles.relatedArticlesContainer}>
              <h2 className={styles.relatedArticlesTitle}>Vezane novosti</h2>
              <div className={styles.relatedArticles}>
                {relatedArticles.map((article, index) => (
                  <NewsCard
                    news={article}
                    className={styles.relatedNewsCard}
                    key={`${index}-${article.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    const redirectRoute = wordpressRedirects.find(
      (redirect) => redirect.source === `/${params.uid}`
    );
    if (redirectRoute) {
      permanentRedirect(`/vijesti/${redirectRoute.destination}`);
    } else {
      notFound();
    }
  }
}
