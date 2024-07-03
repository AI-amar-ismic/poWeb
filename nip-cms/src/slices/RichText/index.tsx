import { Content, asText } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
  PrismicText,
} from "@prismicio/react";
import styles from "./index.module.scss";

const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  if (slice.variation === "default") {
    return (
      <section className={styles.richtext}>
        <PrismicRichText
          field={slice.primary.content}
          components={components}
        />
      </section>
    );
  } else {
    return (
      <section className={`${styles.richtext} ${styles.withFloat}`}>
        <div className={styles.floatContainer}>
          <h2>{asText(slice.primary.floating_box_title)}</h2>
          {slice.items.map((item, index) => (
            <PrismicNextLink field={item.link} key={`${index}-${item.name}`}>
              <div className={styles.documentButton}>
                <p className={styles.documentTitle}>{item.name}</p>
              </div>
            </PrismicNextLink>
          ))}
        </div>
        <div>
          <PrismicRichText
            field={slice.primary.content}
            components={components}
          />
        </div>
      </section>
    );
  }
};

export default RichText;
