import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import NiPButton from "@/components/Button";
import { useState } from "react";
import NewsletterClient from "./wrapper";
import toast from "react-hot-toast";

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
