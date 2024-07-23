"use server";
import { Contacts } from "@/slices/Newsletter";
import axios from "axios";

export const handleAddContact = async (props: Contacts) => {
  fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  }).then((response) => console.log(response));
};
