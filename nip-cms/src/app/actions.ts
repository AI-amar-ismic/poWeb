import { Contacts } from "@/slices/Newsletter";
import axios from "axios";

export const handleAddContact = async (props: Contacts) => {
  "use server";
  axios.put("https://api.sendgrid.com/v3/marketing/contacts", props, {
    headers: {
      Authorization:
        "Bearer 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",
    },
  });
};
