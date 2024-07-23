import { Contacts } from "@/slices/Newsletter";
import axios from "axios";

export const addContact = async (props: Contacts) => {
  axios.put("/api/newsletter", props, {
    headers: { Authorization: process.env.NEXT_PUBLIC_NEWSLETTER_SECRET },
  });
};
