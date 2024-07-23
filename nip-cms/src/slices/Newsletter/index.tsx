import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import NewsletterClient from "./wrapper";

export interface Contacts {
  contacts: { email: string; first_name: string }[];
}

/**
 * Props for `Newsletter`.
 */
export type NewsletterProps = SliceComponentProps<Content.NewsletterSlice>;

/**
 * Component for "Newsletter" Slices.
 */
const Newsletter = (props: NewsletterProps): JSX.Element => {
  return <NewsletterClient sliceData={props} />;
};

export default Newsletter;
