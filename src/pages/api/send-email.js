import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { toEmail, subject, message } = req.body;

    //uibfivvysvuzgitq
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "oneebfaisal@gmail.com",
        pass: "uibfivvysvuzgitq",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    // const transporter = nodemailer.createTransport({
    //   host: "reseller20.webserversystems.com",
    //   port: 465,
    //   secure: true, // Use true for port 465
    //   auth: {
    //     user: "leads@i1smartmarketing.com",
    //     pass: "vjE+C#-Y_(#@",
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });

    const mailOptions = {
      from: "oneebfaisal@gmail.com",
      to: toEmail, // Array of recipient emails
      subject: subject,
      text: message,
      // attachments: [
      //   {
      //     filename: "lead.xml",
      //     content: adfXml,
      //     contentType: "application/xml",
      //   },
      // ],
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
