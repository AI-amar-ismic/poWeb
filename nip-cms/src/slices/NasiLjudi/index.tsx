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
          {screenWidth < 1024
            ? slice.items
                .slice(0, 3)
                .map((person, index) => (
                  <PersonCard person={person} key={index} />
                ))
            : slice.items.map((person, index) => (
                <PersonCard person={person} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default NasiLjudi;
