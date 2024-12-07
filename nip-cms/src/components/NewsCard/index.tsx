import { PrismicNextImage } from "@prismicio/next";
import { ClanakDocument } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/client";
import Link from "next/link";

interface NewsCardProps {
  news: any;
  className?: string;
  fullWidth?: boolean;
}

const NewsCard = ({ news, className, fullWidth }: NewsCardProps) => {
  return (
    <Link
      href={`/vijesti/${news.uid}`}
      className={`${styles.link} ${className}`}
    >
      <div className={`${styles.container} ${fullWidth ? styles.full : ""}`}>
        {fullWidth ? (
          <PrismicNextImage
            field={news.data.istaknuta_slika}
            className={styles.fullImage}
            quality={100}
            priority
          />
        ) : (
          <PrismicNextImage
            field={news.data.istaknuta_slika}
            width={364}
            height={fullWidth ? 467 : 277}
            className={styles.image}
            quality={100}
          />
        )}
        <PrismicRichText
          field={news.data.naslov}
          components={{
            heading1: ({ children }) => {
              return <h3 className={styles.title}>{children}</h3>;
            },
          }}
        />
        <p>{`${news.data.tekst[0]?.text?.slice(0, fullWidth ? 250 : 65)}...`}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
