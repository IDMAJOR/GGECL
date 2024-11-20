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
    timestamps: true,
  }
);

const mailModel = mongoose.model("mailModel", MailSchema);

module.exports = { mailModel };
