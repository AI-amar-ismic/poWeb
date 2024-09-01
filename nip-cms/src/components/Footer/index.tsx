"use client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FooterDocumentData, Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import {
  EmailIcon,
  HomeIcon,
  InfoIconToast,
  PhoneIcon,
  PolygonIcon,
} from "@/assets/icons";
import NiPButton from "../Button";
import { PrismicRichText } from "@prismicio/react";
import Input from "../Input";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { emailRegex } from "@/assets/regex";
import { addContact } from "@/utils/api";
import ReCAPTCHA from "react-google-recaptcha";

interface FooterProps {
  data: Simplify<FooterDocumentData>;
}

const Footer = ({ data }: FooterProps) => {
  const [first_name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const recaptchaRef = useRef<ReCAPTCHA>(null);
  // const [isVerified, setIsVerified] = useState(false);

  // async function handleCaptchaSubmission(token: string | null) {
  //   try {
  //     if (token) {
  //       await fetch("/api/recaptcha", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ token }),
  //       });
  //       setIsVerified(true);
  //     }
  //   } catch (e) {
  //     setIsVerified(false);
  //   }
  // }

  // const handleChange = (token: string | null) => {
  //   handleCaptchaSubmission(token);
  // };

  // function handleExpired() {
  //   setIsVerified(false);
  // }

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
            value={first_name}
            onChange={(value) => setName(value)}
            placeholder="Ime i Prezime"
          />
          <Input
            value={email}
            onChange={(value) => setEmail(value)}
            placeholder="E-mail"
          />
          {/* <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            ref={recaptchaRef}
            onChange={handleChange}
            onExpired={handleExpired}
            size="invisible"
          /> */}
          <NiPButton
            variant="primary"
            onClick={async () => {
              if (first_name === "") {
                toast.error("Molimo Vas unesite validno ime i prezime");
                return;
              }
              if (email === "" || !emailRegex.test(email)) {
                toast.error("Molimo Vas unesite validan e-mail");
                return;
              }

              await addContact({ contacts: [{ first_name, email }] });

              toast.success(
                "Uspješno ste se prijavili na newsletter Naroda i Pravde.",
                { icon: <InfoIconToast /> }
              );
            }}
            // disabled={!isVerified}
          >
            {data.newsletter_button_text}
          </NiPButton>
        </div>
      </div>
    </div>
  );
};

export default Footer;
