"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FooterDocumentData, Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import exp from "constants";
import { EmailIcon, HomeIcon, PhoneIcon, PolygonIcon } from "@/assets/icons";
import NiPButton from "../Button";
import { PrismicRichText } from "@prismicio/react";
import Input from "../Input";
import { useState } from "react";

interface FooterProps {
  data: Simplify<FooterDocumentData>;
}

const Footer = ({ data }: FooterProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.logoSection}>
          <PrismicNextImage field={data.logo} />
          <div className={styles.infoSection}>
            <div className={styles.infoContainer}>
              <HomeIcon />
              <p className={styles.info}>{data.adresa}</p>
            </div>
            <div className={styles.infoContainer}>
              <PhoneIcon />
              <p className={styles.info}>{data.telefon}</p>
            </div>
            <div className={styles.infoContainer}>
              <EmailIcon />
              <p className={styles.info}>{data.email}</p>
            </div>
          </div>
          <div className={styles.buttonSection}>
            <NiPButton
              fullWidth
              variant="secondaryOutlined"
              link={data.button_1_link}
            >
              {data.button_1_text}
            </NiPButton>
            <NiPButton fullWidth variant="primary" link={data.button_2_link}>
              {data.button_2_text}
            </NiPButton>
          </div>
          <div className={styles.socialContainer}>
            {data.linkovi_na_mreze.map((social, i) => (
              <PrismicNextLink key={i} field={social.link}>
                <PrismicNextImage field={social.ikona} />
              </PrismicNextLink>
            ))}
          </div>
        </div>
        <div className={`${styles.documentsContainer} ${styles.navigacija}`}>
          <h3 className={styles.title}>Navigacija</h3>
          <div className={styles.navContainer}>
            {data.navigacija.map((menu, i) => (
              <div key={`${menu.title}-${i}`} className={styles.navItem}>
                <PolygonIcon />
                <PrismicNextLink field={menu.link}>
                  <p className={styles.navText}>{menu.title}</p>
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.documentsContainer} ${styles.dokumenti}`}>
          <h3 className={styles.title}>Dokumenti</h3>
          <div className={styles.navContainer}>
            {data.dokumenti.map((menu, i) => (
              <div key={`${menu.title}-${i}`} className={styles.navItem}>
                <PolygonIcon />
                <PrismicNextLink field={menu.link}>
                  <p className={styles.navText}>{menu.title}</p>
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.documentsContainer} ${styles.newsletter}`}>
          <PrismicRichText
            field={data.newsletter_title}
            components={{
              heading3: ({ children }) => {
                return <h3 className={styles.title}>{children}</h3>;
              },
            }}
          />
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
          <NiPButton variant="primary">{data.newsletter_button_text}</NiPButton>
        </div>
      </div>
    </div>
  );
};

export default Footer;
