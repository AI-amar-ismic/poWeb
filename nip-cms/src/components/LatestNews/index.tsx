"use client";
import { PrismicRichText } from "@prismicio/react";
import styles from "./index.module.scss";
import { ClanakDocument } from "../../../prismicio-types";
import { RichTextField, TitleField } from "@prismicio/client";
import NiPButton from "../Button";
import NewsCard from "../NewsCard";
import { useEffect, useState } from "react";

interface LatestNewsProps {
  data: ClanakDocument[];
  title: TitleField;
  subtitle: RichTextField;
  buttonText: string;
}

const LatestNews = ({ data, title, subtitle, buttonText }: LatestNewsProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div key={index}>
              <NewsCard news={news} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
