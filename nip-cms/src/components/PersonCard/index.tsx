import { Content } from "@prismicio/client";
import { Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

const PersonCard = ({ person }: { person: any }) => {
  return (
    <div className={styles.container}>
      <PrismicNextImage
        field={person.covjek.data.slika}
        width={320}
        height={310}
      />
      <PrismicRichText
        field={person.covjek.data.ime_prezime}
        components={{
          heading3: ({ children }) => {
            return <h3 className={styles.title}>{children}</h3>;
          },
        }}
      />
      <PrismicRichText
        field={person.covjek.data.pozicija}
        components={{
          paragraph: ({ children }) => {
            return <p className={styles.subtitle}>{children}</p>;
          },
        }}
      />
    </div>
  );
};

export default PersonCard;
