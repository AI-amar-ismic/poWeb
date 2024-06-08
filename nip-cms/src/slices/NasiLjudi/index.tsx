import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import NiPButton from "@/components/Button";
import PersonCard from "@/components/PersonCard";

/**
 * Props for `NasiLjudi`.
 */
export type NasiLjudiProps = SliceComponentProps<Content.NasiLjudiSlice>;

/**
 * Component for "NasiLjudi" Slices.
 */
const NasiLjudi = ({ slice }: NasiLjudiProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer}>
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading2: ({ children }) => {
                  return <h3 className={styles.title}>{children}</h3>;
                },
              }}
            />
            <PrismicRichText
              field={slice.primary.subtitle}
              components={{
                paragraph: ({ children }) => {
                  return <h3 className={styles.subtitle}>{children}</h3>;
                },
              }}
            />
          </div>
          <NiPButton variant="primaryOutlined">
            {slice.primary.button_text}
          </NiPButton>
        </div>
        <div className={styles.peopleContainer}>
          {slice.items.map((person, index) => (
            <PersonCard person={person} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NasiLjudi;
