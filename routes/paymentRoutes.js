const express = require("express");
const { paystack, paypal } = require("../controller/paymentController");

const router = express.Router();

router.route("/paystack").post(paystack);
router.route("/paypal").post(paypal);

module.exports = router;
