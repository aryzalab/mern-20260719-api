import { Resend } from "resend";
import config from "../config/config.js";

const resend = new Resend(config.resendApiKey);

const sendEmail = async ({
  from = "onboarding@resend.dev",
  to,
  subject,
  html,
}) => {
  const { data } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
};

export default sendEmail;
