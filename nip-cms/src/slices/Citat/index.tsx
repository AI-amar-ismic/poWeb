import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import CurvedSection from "@/components/CurvedSection";

/**
 * Props for `Citat`.
 */
export type CitatProps = SliceComponentProps<Content.CitatSlice>;

/**
 * Component for "Citat" Slices.
 */
const Citat = ({ slice }: CitatProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${slice.primary.slika.url})` }}
    >
      <div className={styles.quoteContainer}>
        <div className={styles.quoteContentContainer}>
          <PrismicRichText
            field={slice.primary.citat}
            components={{
              heading2: ({ children }) => {
                return <h3 className={styles.quote}>{children}</h3>;
              },
            }}
          />
          <div className={styles.nameContainer}>
            <PrismicRichText
              field={slice.primary.ime_prezime}
              components={{
                paragraph: ({ children }) => {
                  return <p className={styles.name}>{children}</p>;
                },
              }}
            />
            <PrismicRichText
              field={slice.primary.pozicija}
              components={{
                paragraph: ({ children }) => {
                  return <p className={styles.position}>{children}</p>;
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citat;
