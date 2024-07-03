import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";

/**
 * Props for `Organ`.
 */
export type OrganProps = SliceComponentProps<Content.OrganSlice>;

/**
 * Component for "Organ" Slices.
 */
const Organ = ({ slice }: OrganProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.container}
    >
      <PrismicRichText
        field={slice.primary.naziv_organa}
        components={{
          heading2: ({ children }) => {
            return <h2 className={styles.title}>{children}</h2>;
          },
        }}
      />
      <div className={styles.peopleContainer}>
        {slice.items.map((person, index) => (
          <div
            className={styles.personContainer}
            key={`${person.clan}-${index}`}
          >
            <PrismicRichText
              field={person.clan}
              components={{
                paragraph: ({ children }) => {
                  return <p className={styles.name}>{children}</p>;
                },
              }}
            />
            <PrismicRichText
              field={person.pozicija}
              components={{
                paragraph: ({ children }) => {
                  return <p className={styles.position}>{children}</p>;
                },
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organ;
