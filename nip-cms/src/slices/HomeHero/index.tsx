import { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import RichText from "../RichText";
import styles from "./homeHero.module.scss";
import { url } from "inspector";
import NiPButton from "@/components/Button";
import { ArrowIcon } from "@/assets/icons";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `HomeHero`.
 */
export type HomeHeroProps = SliceComponentProps<Content.HomeHeroSlice>;

/**
 * Component for "HomeHero" Slices.
 */
const HomeHero = ({ slice }: HomeHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={styles.topContainer}
        style={{
          backgroundImage: `url(${slice.primary.hero_image.url})`,
          backgroundSize: "cover",
        }}
      >
        <div className={styles.imageContainer}>
          <div className={styles.contentContainer}>
            <PrismicRichText
              field={slice.primary.hero_title}
              components={{
                heading1: ({ children }) => {
                  return <h1 className={styles.title}>{children}</h1>;
                },
              }}
            />
            <PrismicRichText
              field={slice.primary.hero_subtitle}
              components={{
                paragraph: ({ children }) => {
                  return <p className={styles.subtitle}>{children}</p>;
                },
              }}
            />
            <div className={styles.buttonsContainer}>
              <NiPButton
                variant="tertiaryOutlined"
                link={slice.primary.primary_button_link}
              >
                {slice.primary.primary_button_text}
              </NiPButton>
              <NiPButton
                variant="tertiary"
                link={slice.primary.secondary_button_link}
              >
                {slice.primary.secondary_button_text}
              </NiPButton>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.calloutContainer}>
          <PrismicRichText
            field={slice.primary.hero_callout}
            components={{
              heading1: ({ children }) => {
                return <h1 className={styles.callout}>{children}</h1>;
              },
            }}
          />
          <ArrowIcon />
          <div className={styles.blueSection}>
            {slice.items.map((item, i) => (
              <div
                key={`${item.politike_title}-${i}`}
                className={styles.blueTextContainer}
              >
                <div className={styles.numberTitleContainer}>
                  <h1 className={styles.number}>{i + 1}</h1>
                  <PrismicRichText
                    field={item.politike_title}
                    components={{
                      heading2: ({ children }) => {
                        return <h2 className={styles.title}>{children}</h2>;
                      },
                    }}
                  />
                </div>
                <PrismicRichText
                  field={item.politike_text}
                  components={{
                    paragraph: ({ children }) => {
                      return <p className={styles.subText}>{children}</p>;
                    },
                  }}
                />
                <PrismicNextLink field={item.procitaj_vise_link}>
                  <p className={styles.subText}>Pročitaj više</p>
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
