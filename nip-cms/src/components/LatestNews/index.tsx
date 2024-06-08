import { PrismicRichText } from "@prismicio/react";
import styles from "./index.module.scss";
import { ClanakDocument } from "../../../prismicio-types";
import { RichTextField, TitleField } from "@prismicio/client";
import NiPButton from "../Button";
import NewsCard from "../NewsCard";

interface LatestNewsProps {
  data: ClanakDocument[];
  title: TitleField;
  subtitle: RichTextField;
  buttonText: string;
}

const LatestNews = ({ data, title, subtitle, buttonText }: LatestNewsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer}>
            <PrismicRichText
              field={title}
              components={{
                heading2: ({ children }) => {
                  return <h3 className={styles.title}>{children}</h3>;
                },
              }}
            />
            <PrismicRichText
              field={subtitle}
              components={{
                paragraph: ({ children }) => {
                  return <h3 className={styles.subtitle}>{children}</h3>;
                },
              }}
            />
          </div>
          <NiPButton variant="primaryOutlined">{buttonText}</NiPButton>
        </div>
        <div className={styles.newsContainer}>
          {data.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
