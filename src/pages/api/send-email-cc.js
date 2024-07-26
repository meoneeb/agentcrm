import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { toEmail, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "i1smartmarketing@gmail.com",
        pass: "oixiaycjghbdlrdq",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "i1smartmarketing@gmail.com",
      to: toEmail,
      subject: subject,
      text: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to send email", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
