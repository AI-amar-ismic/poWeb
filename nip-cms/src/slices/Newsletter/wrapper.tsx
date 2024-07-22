"use client";
import { PrismicRichText } from "@prismicio/react";
import Newsletter, { Contacts, NewsletterProps } from ".";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import NiPButton from "@/components/Button";
import { useOptimistic, useState } from "react";
import toast from "react-hot-toast";
import { emailRegex } from "@/assets/regex";
import { InfoIconToast } from "@/assets/icons";

interface NewsletterClientProps {
  sliceData: NewsletterProps;
  handleClick: (props: Contacts) => Promise<any>;
}

const NewsletterClient = ({
  sliceData,
  handleClick,
}: NewsletterClientProps) => {
  const { slice } = sliceData;
  const [first_name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

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
              value={first_name}
              onChange={(value) => setName(value)}
              placeholder="Ime i Prezime"
            />
            <Input
              value={email}
              onChange={(value) => setEmail(value)}
              placeholder="E-mail"
            />
            <NiPButton
              variant="primary"
              onClick={async () => {
                if (first_name === "") {
                  setNameError(true);
                  toast.error("Molimo Vas unesite validno ime i prezime");
                  return;
                }
                if (email === "" || !emailRegex.test(email)) {
                  setEmailError(true);
                  toast.error("Molimo Vas unesite validan e-mail");
                  return;
                }

                handleClick({ contacts: [{ first_name, email }] });
                toast.success(
                  "Uspješno ste se prijavili na newsletter Naroda i Pravde.",
                  { icon: <InfoIconToast /> }
                );
              }}
            >
              {slice.primary.button_text}
            </NiPButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterClient;
