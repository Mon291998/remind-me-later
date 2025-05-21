const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/reminder", async (req, res) => {
  const { date, time, email } = req.body;

  try {
    // Configure your mail transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mrunaliwaghmare29@gmail.com",
        pass: "lbts irjp napp mhwm",
      },
    });

    const mailOptions = {
      from: "mrunaliwaghmare29@gmail.com",
      to: email,
      subject: "Reminder Set",
      text: `Reminder set for ${date} at ${time}.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Reminder email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reminder email." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
