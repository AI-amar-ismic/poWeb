"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import NiPButton from "@/components/Button";
import PersonCard from "@/components/PersonCard";
import { useEffect, useState } from "react";

/**
 * Props for `NasiLjudi`.
 */
export type NasiLjudiProps = SliceComponentProps<Content.NasiLjudiSlice>;

/**
 * Component for "NasiLjudi" Slices.
 */
const NasiLjudi = ({ slice }: NasiLjudiProps): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (slice.variation === "default") {
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
            <NiPButton
              variant="primaryOutlined"
              link={slice.primary.button_link}
            >
              {slice.primary.button_text}
            </NiPButton>
          </div>
          <div className={styles.peopleTopContainer}>
            <div className={styles.peopleContainer}>
              {slice.items.map((person, index) => (
                <div key={index}>
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
            <NiPButton
              variant="primaryOutlined"
              link={slice.primary.button_link}
            >
              {slice.primary.button_text}
            </NiPButton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.pageContainer}>
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => {
              return <h1 className={styles.title}>{children}</h1>;
            },
          }}
        />
        <div className={styles.peopleContainer}>
          {slice.items.map((person, index) => (
            <PersonCard person={person} key={`${index}-page`} />
          ))}
        </div>
      </div>
    );
  }
};

export default NasiLjudi;
