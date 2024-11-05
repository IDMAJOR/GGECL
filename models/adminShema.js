const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    adminAuthId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
