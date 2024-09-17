import { Content, filter } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import { createClient } from "@/prismicio";
import { ClanakDocument } from "../../../prismicio-types";
import NewsCard from "@/components/NewsCard";

/**
 * Props for `VezaneVijesti`.
 */
export type VezaneVijestiProps =
  SliceComponentProps<Content.VezaneVijestiSlice>;

/**
 * Component for "VezaneVijesti" Slices.
 */
const VezaneVijesti = async ({ slice }: VezaneVijestiProps) => {
  const client = createClient();
  const tags: string[] = slice.items.map((item) => item.tag as string);
  const relatedArticles = await client.getAllBySomeTags<ClanakDocument>(tags, {
    limit: 3,
    filters: [filter.at("document.type", "clanak")],
    orderings: { field: "document.first_publication_date", direction: "desc" },
  });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.container}
    >
      <PrismicRichText
        field={slice.primary.naslov}
        components={{
          heading2: ({ children }) => {
            return <h2 className={styles.title}>{children}</h2>;
          },
        }}
      />
      <div className={styles.newsContainer}>
        {relatedArticles.map((article, index) => (
          <NewsCard
            news={article}
            key={`${index}-${article.data.naslov}`}
            className={styles.card}
          />
        ))}
      </div>
    </section>
  );
};

export default VezaneVijesti;
