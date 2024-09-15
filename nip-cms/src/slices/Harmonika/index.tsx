"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./styles.module.scss";
import NiPButton from "@/components/Button";
import { PrismicNextLink } from "@prismicio/next";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowIcon, SmallArrowIcon } from "@/assets/icons";
/**
 * Props for `Harmonika`.
 */
export type HarmonikaProps = SliceComponentProps<Content.HarmonikaSlice>;

/**
 * Component for "Harmonika" Slices.
 */
const Harmonika = ({ slice }: HarmonikaProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.container}
    >
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value={slice.id} className={styles.item}>
          <Accordion.Header className={styles.header}>
            <Accordion.Trigger className={styles.trigger}>
              <p className={styles.itemTitle}>{slice.primary.title}</p>
              <SmallArrowIcon />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.content}>
            {slice.items.map((item, index) => (
              <PrismicNextLink
                field={item.document}
                key={`${index}-${item.title}`}
              >
                <NiPButton>{item.title}</NiPButton>
              </PrismicNextLink>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
};

export default Harmonika;
