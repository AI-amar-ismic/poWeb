import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import NiPButton from "@/components/Button";
import { useState } from "react";
import axios from "axios";
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
  const handleClick = async (props: Contacts) => {
    "use server";
    axios.put("https://api.sendgrid.com/v3/marketing/contacts", props, {
      headers: {
        Authorization:
          "Bearer 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",
      },
    });
  };

  return <NewsletterClient sliceData={props} handleClick={handleClick} />;
};

export default Newsletter;
