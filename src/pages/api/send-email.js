import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { toEmail, subject, message } = req.body;

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "oneebfaisal@gmail.com",
    //     pass: "uibfivvysvuzgitq",
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });

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

    // const transporter = nodemailer.createTransport({
    //   host: "reseller20.webserversystems.com",
    //   port: 465,
    //   secure: true, // Use true for port 465
    //   auth: {
    //     user: "lead@flarepass.com",
    //     pass: "&2+&H+Ora*]%",
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });

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
      from: "leads@i1smartmarketing.com",
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
