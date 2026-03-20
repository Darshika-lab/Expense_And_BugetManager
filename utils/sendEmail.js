const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, text, html = null) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text
  };

  if (html) {
    mailOptions.html = html;
  }

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;