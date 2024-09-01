import { Contacts } from "@/slices/Newsletter";
import axios from "axios";

interface ContactFormProps {
  name: string;
  email: string;
  telefon: string;
  prebivaliste: string;
  poruka: string;
}

export const addContact = async (props: Contacts) => {
  axios.put("/api/newsletter", props, {
    headers: { Authorization: process.env.NEXT_PUBLIC_NEWSLETTER_SECRET },
  });
};

export const sendContactForm = async (props: ContactFormProps) => {
  axios.post("/api/contact-form", props);
};
