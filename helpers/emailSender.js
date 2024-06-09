require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Function to send email to an array of recipients
function sendEmail(recipients) {
  // Join the array of recipients into a comma-separated string
  const to = recipients.join(",");
  console.log("to>>>>>>>>>", to);
  // Set up email data
  const mailOptions = {
    from: `ediaryteam@gmail.com`, // Sender address
    to: to, // List of recipients as a comma-separated string
    subject: "New Diary Created", // Subject line from .env
    text: "A new diary has been added to eDiary.", // Plain text body from .env
    html: `<p>A new diary entry has been added to eDiary.</p>`, // HTML body from .env
  };

  // Send mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error.message);
    }
    console.log("Message sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  });
}

// Export the sendEmail function
module.exports = sendEmail;
