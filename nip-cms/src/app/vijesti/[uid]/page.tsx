import { Metadata } from "next";
import { createClient } from "@/prismicio";
import styles from "./page.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import NewsCard from "@/components/NewsCard";
import { ClanakDocument } from "../../../../prismicio-types";

type Params = { uid: string };

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

export default async function Vijest({ params }: { params: Params }) {
  // The client queries content from the Prismic API
  //

  const client = createClient();
  const home = await client.getByUID("clanak", params.uid);
  const relatedArticles = await client.getAllBySomeTags<ClanakDocument>(
    home.tags,
    {
      limit: 3,
    }
  );

  const getDate = () => {
    const date = new Date(home.first_publication_date);
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
              field={home.data.naslov}
              components={{
                heading1: ({ children }) => {
                  return <h1 className={styles.title}>{children}</h1>;
                },
              }}
            />
            <PrismicNextImage
              field={home.data.istaknuta_slika}
              className={styles.image}
              priority
            />
            <div className={styles.textContainer}>
              <PrismicRichText
                field={home.data.tekst}
                components={{
                  heading1: ({ children }) => {
                    return <h1 className={styles.title}>{children}</h1>;
                  },
                  paragraph: ({ children }) => {
                    return <p className={styles.paragraph}>{children}</p>;
                  },
                  strong: ({ children }) => {
                    return <p className={styles.paragraphStrong}>{children}</p>;
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
        {relatedArticles.length > 1 && (
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
}
