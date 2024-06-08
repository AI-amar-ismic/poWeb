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
        <PrismicRichText
          field={slice.primary.citat}
          components={{
            heading2: ({ children }) => {
              return <h3 className={styles.quote}>{children}</h3>;
            },
          }}
        />
      </div>
    </div>
  );
};

export default Citat;
