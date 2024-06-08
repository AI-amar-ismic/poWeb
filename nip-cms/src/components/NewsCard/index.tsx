import { PrismicNextImage } from "@prismicio/next";
import { ClanakDocument } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";
import Link from "next/link";

interface NewsCardProps {
  news: any;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <Link href={`/novosti/${news.uid}`} className={styles.link}>
      <div className={styles.container}>
        <PrismicNextImage
          field={news.data.istaknuta_slika}
          width={364}
          height={277}
          className={styles.image}
        />
        <PrismicRichText
          field={news.data.naslov}
          components={{
            heading1: ({ children }) => {
              return <h3 className={styles.title}>{children}</h3>;
            },
          }}
        />
        <p>{`${news.data.tekst[0]?.text?.slice(0, 65)}...`}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
