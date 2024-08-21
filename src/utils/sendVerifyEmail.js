const transporter = require("../config/mailer");
const {verifyEmailBody} = require('../utils/htmlResponse')

function sendVerificationEmail(to, fullName, verificationUrl) {
  const emailBody = verifyEmailBody
    .replaceAll("{{verificationUrl}}", verificationUrl)
    .replace("{{userFullName}}", fullName);

  const mailOptions = {
    from: 'Noorudd.in <verify@noorudd.in>',
    to,
    subject: "Email Verification",
    html: emailBody,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = sendVerificationEmail