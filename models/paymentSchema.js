const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymethod: {
    type: String,
    required: true,
  },
});

const PaymentModel = mongoose.model("Payments", PaymentSchema);

module.exports = { PaymentModel };
