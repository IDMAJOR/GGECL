const mongoose = require("mongoose");

const MailSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const mailModel = mongoose.model("mailModel", MailSchema);

module.exports = { mailModel };
