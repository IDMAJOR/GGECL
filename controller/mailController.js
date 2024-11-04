const nodemailer = require("nodemailer");
const { mailModel } = require("../models/mailSchema");

const getSentEmail = async (req, res) => {
  try {
    const mailAndMessage = await mailModel.find({});

    if (!mailAndMessage) {
      res.status(404).send({ message: "No mail has been recieved" });
    }

    res.status(200).send(mailAndMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Set up email options
    const mailOptions = {
      from: process.env.USER, // Your email address
      replyTo: email, // Client's email
      to: process.env.USER, // Your email address to receive the message
      subject: subject, // Subject line
      text: message,
      html: `   
        <div style="
          display: block;
          margin: 0 auto;
          background: linear-gradient(145deg, #0c0c1b, #141414);
          width: 100%;
          max-width: 500px;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          color: #f1f1f1;
        ">
          <h1 style="
            margin: 0;
            color: #c0c0c0;
            background-color: rgba(59, 59, 59, 0.6);
            font-size: 1.5rem;
            text-align: center;
            padding: 10px;
            border-radius: 8px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
          ">
            New message from ${email}
          </h1>
      
          <div style="
            margin-top: 20px;
            display: block;
            font-size: 1rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #007bff;
          ">
            <p style="margin: 0"><b>Name:</b> ${name}</p>
            <p style="margin: 0"><b>Email:</b> ${email}</p>
            <p style="margin: 0"><b>Message:</b></p>
            <div style="
              border-radius: 8px;
              font-size: 1rem;
              color: #f1f1f1;
              background-color: rgba(25, 25, 25, 0.7);
              padding: 15px;
              font-weight: 500;
              border-left: 5px solid #04428d;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            ">
              ${message}
            </div>
          </div>
        </div>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Save the email data to the database
    const emailSent = await mailModel.create({ name, email, subject, message });

    if (!emailSent) {
      return res.status(400).send("Failed to save email data.");
    }

    // Respond with success
    res
      .status(201)
      .send({ success: "Email sent successfully", data: emailSent });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(500).send({ message: "Internal server error", details: error });
  }
};

const contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: email, // Use your email address
      replyTo: process.env.USER, // Client's email
      to: process.env.USER, // Your email address to receive the message
      subject: "New email from GGEC website", // Subject line
      text: message,
      html: `   
      <div style="
        display: block;
        margin: 0 auto;
        background: linear-gradient(145deg, #0c0c1b, #141414);
        width: 100%;
        max-width: 500px;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        color: #f1f1f1;
      ">
        <h1 style="
          margin: 0;
          color: #c0c0c0;
          background-color: rgba(59, 59, 59, 0.6);
          font-size: 1.5rem;
          text-align: center;
          padding: 10px;
          border-radius: 8px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        ">
          New message from ${email}
        </h1>
    
        <div style="
          margin-top: 20px;
          display: block;
          font-size: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #007bff;
        ">
          <p style="margin: 0"><b>Name:</b> ${name}</p>
          <p style="margin: 0"><b>Email:</b> ${email}</p>
          <p style="margin: 0"><b>Message:</b></p>
          <div style="
            border-radius: 8px;
            font-size: 1rem;
            color: #f1f1f1;
            background-color: rgba(25, 25, 25, 0.7);
            padding: 15px;
            font-weight: 500;
            border-left: 5px solid #04428d;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          ">
            ${message}
          </div>
        </div>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .send({ message: "Error sending email", details: error });
      }

      res.status(201).send({ success: "Email sent successfully", data: info });
    });

    res.status(201).send("Email has been sent");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getSentEmail, sendEmail, contactUs };
