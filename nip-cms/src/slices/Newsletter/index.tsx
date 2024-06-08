"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import NiPButton from "@/components/Button";
import { useState } from "react";

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = ({ slice }: NewsletterProps): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${slice.primary.background_image.url})` }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.callContainer}>
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading3: ({ children }) => {
                return <h3 className={styles.title}>{children}</h3>;
              },
            }}
          />
          <PrismicRichText
            field={slice.primary.subtitle}
            components={{
              paragraph: ({ children }) => {
                return <p className={styles.subtitle}>{children}</p>;
              },
            }}
          />
          <div className={styles.inputContainer}>
            <Input
              value={name}
              onChange={(value) => setName(value)}
              placeholder="Ime i Prezime"
            />
            <Input
              value={email}
              onChange={(value) => setName(email)}
              placeholder="E-mail"
            />
            <NiPButton variant="primary">{slice.primary.button_text}</NiPButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
