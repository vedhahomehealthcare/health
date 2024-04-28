const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// POST endpoint for sending email
app.post("/send_email", (req, res) => {
  const { name, phno, details } = req.body;
  console.log(req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vedhahomehealthcare@gmail.com", // Your email address
      pass: "ibnx unpp atpf wqlx", // Your email password
    },
  });

  let mailOptions = {
    from: "stmanoj6666@gmail.com", // Sender's email address
    to: "mallikarjunvjv@gmail.com", // Recipient's email address
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${phno}\nMessage: ${details}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully!");
    }
  });
});

// // Twilio credentials
// const accountSid = "ACe25e32709f6448d3c3258b261899490f";
// const authToken = "be762ba6d0363ae2b81a613ba97a2a5d";
// const client = new twilio(accountSid, authToken);

// Route for form submission
// app.post("/submit", (req, res) => {
//   const formData = req.body; // Assuming your form sends data in req.body

//   // Format the message you want to send
//   const message = `New form submission:\nName: ${formData.name}\nEmail: ${formData.phno}\nMessage: ${formData.details}`;

//   // Send the message via Twilio
//   client.messages
//     .create({
//       from: "whatsapp:+16182235200",
//       to: "whatsapp:+919959132663",
//       body: message,
//     })
//     .then(() => {
//       res.send("Message sent successfully!");
//     })
//     .catch((err) => {
//       console.error("Error sending message:", err);
//       res.status(500).send("Error sending message");
//     });
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
