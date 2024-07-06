"use client";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import { EmailIcon, HomeIcon, PhoneIcon } from "@/assets/icons";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useState } from "react";
import Input from "@/components/Input";
import NiPButton from "@/components/Button";

/**
 * Props for `Kontakt`.
 */
export type KontaktProps = SliceComponentProps<Content.KontaktSlice>;

/**
 * Component for "Kontakt" Slices.
 */
const Kontakt = ({ slice }: KontaktProps): JSX.Element => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [prebivaliste, setPrebivaliste] = useState("");
  const [poruka, setPoruka] = useState("");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.container}
    >
      <div className={styles.infoContainer}>
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => {
              return <h2 className={styles.title}>{children}</h2>;
            },
          }}
        />
        <PrismicRichText
          field={slice.primary.subtitle}
          components={{
            paragraph: ({ children }) => {
              return <h2 className={styles.subtitle}>{children}</h2>;
            },
          }}
        />
        <div className={styles.contactContainer}>
          <div className={styles.contact}>
            <HomeIcon />
            <p>{slice.primary.adresa}</p>
          </div>
          <div className={styles.contact}>
            <PhoneIcon />
            <p>{slice.primary.broj_telefona}</p>
          </div>
          <div className={styles.contact}>
            <EmailIcon />
            <p>{slice.primary.email}</p>
          </div>
          <div className={styles.socials}>
            {slice.items.map((social, index) => (
              <PrismicNextLink field={social.link} key={`${index}`}>
                <PrismicNextImage field={social.icon} />
              </PrismicNextLink>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.partialContainer}>
          <div className={styles.labelContainer}>
            <p>Ime i prezime *</p>
            <Input
              value={name}
              onChange={(value) => setName(value)}
              variation="secondary"
            />
          </div>
          <div className={styles.labelContainer}>
            <p>E-mail *</p>
            <Input
              value={email}
              onChange={(value) => setEmail(value)}
              variation="secondary"
            />
          </div>
        </div>
        <div className={styles.partialContainer}>
          <div className={styles.labelContainer}>
            <p>Broj telefona *</p>
            <Input
              value={telefon}
              onChange={(value) => setTelefon(value)}
              variation="secondary"
            />
          </div>
          <div className={styles.labelContainer}>
            <p>Mjesto prebivališta *</p>
            <Input
              value={prebivaliste}
              onChange={(value) => setPrebivaliste(value)}
              variation="secondary"
            />
          </div>
        </div>
        <div className={styles.labelContainer}>
          <p>Poruka *</p>
          <Input
            value={poruka}
            onChange={(value) => setPoruka(value)}
            variation="secondary"
            isTextArea
          />
        </div>
        <NiPButton variant="primary">Pošalji</NiPButton>
      </div>
    </section>
  );
};

export default Kontakt;
