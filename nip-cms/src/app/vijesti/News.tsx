import { PrismicRichText } from "@prismicio/react";
import styles from "./page.module.scss";
import NewsCard from "@/components/NewsCard";
import PaginationComponent from "@/components/Pagination";
import { ClanakDocument, VijestiDocument } from "../../../prismicio-types";
import { Query } from "@prismicio/client";

interface NewsProps {
  home: VijestiDocument<string>;
  data: Query<ClanakDocument<string>>;
  currentPage: number;
}

const News = ({ home, data, currentPage }: NewsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PrismicRichText
          field={home?.data.naslov}
          components={{
            heading2: ({ children }) => {
              return <h2 className={styles.title}>{children}</h2>;
            },
          }}
        />
        <div className={styles.newsTopContainer}>
          <div className={styles.newsContainer}>
            {data?.results.map((news, index) => (
              <NewsCard
                news={news}
                key={index}
                className={`${index === 0 ? styles.full : ""}`}
                fullWidth={index === 0}
              />
            ))}
          </div>
          <PaginationComponent
            page={currentPage}
            total={data?.total_pages ?? 1}
            baseRoute="/vijesti"
          />
        </div>
      </div>
    </div>
  );
};

export default News;
