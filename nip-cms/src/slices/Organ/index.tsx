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
  if (slice.variation === "default") {
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
  } else if (slice.variation === "organizacijeCentrala") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.containerOrganizacije}
      >
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => {
              return <h2 className={styles.title}>{children}</h2>;
            },
          }}
        />
        <div className={styles.textContainer}>
          {slice.items.map((organizacija, index) => (
            <div
              className={styles.organizacija}
              key={`${index}-${organizacija.naziv_ureda}`}
            >
              <PrismicRichText
                field={organizacija.naziv_ureda}
                components={{
                  heading3: ({ children }) => {
                    return <h3 className={styles.name}>{children}</h3>;
                  },
                }}
              />
              <div className={styles.adressContainer}>
                <div>
                  <PrismicRichText
                    field={organizacija.adresa_linija_1}
                    components={{
                      paragraph: ({ children }) => {
                        return <p className={styles.address}>{children}</p>;
                      },
                    }}
                  />
                </div>
                <div>
                  <PrismicRichText
                    field={organizacija.adresa_linija_2}
                    components={{
                      paragraph: ({ children }) => {
                        return <p className={styles.address}>{children}</p>;
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.containerKanton}
      >
        <PrismicRichText
          field={slice.primary.naziv_kantona}
          components={{
            heading3: ({ children }) => {
              return <h3 className={styles.title}>{children}</h3>;
            },
          }}
        />
        <div className={styles.orgContainer}>
          {slice.items.map((kanton, index) => (
            <div
              key={`${index}-${kanton.organizacija}`}
              className={styles.kanton}
            >
              <PrismicRichText
                field={kanton.organizacija}
                components={{
                  paragraph: ({ children }) => {
                    return <p className={styles.name}>{children}</p>;
                  },
                }}
              />
              <PrismicRichText
                field={kanton.adresa}
                components={{
                  paragraph: ({ children }) => {
                    return <p className={styles.adresa}>{children}</p>;
                  },
                }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
};

export default Organ;
