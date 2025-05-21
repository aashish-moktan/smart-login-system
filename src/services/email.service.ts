import { SendMailOptions } from "nodemailer";
import { transporter } from "@app/config";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  async sendEmail({ to, subject, html }: EmailPayload) {
    try {
      const mailOptions: SendMailOptions = {
        from: "Smart Login System",
        to,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
      return info;
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }
}
