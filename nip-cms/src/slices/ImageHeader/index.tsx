import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ImageHeader`.
 */
export type ImageHeaderProps = SliceComponentProps<Content.ImageHeaderSlice>;

/**
 * Component for "ImageHeader" Slices.
 */
const ImageHeader = ({ slice }: ImageHeaderProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.container}
      style={{ backgroundImage: `url(${slice.primary.background_image.url})` }}
    >
      <div className={styles.content}>
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading1: ({ children }) => {
              return <h1 className={styles.title}>{children}</h1>;
            },
          }}
        />
      </div>
    </section>
  );
};

export default ImageHeader;
