const express = require("express");
const {
  getSentEmail,
  sendEmail,
  contactUs,
} = require("../controller/mailController");

const router = express.Router();

router.route("/get-email").get(getSentEmail);
router.route("/send-email").post(sendEmail);
router.route("/contact-us").post(contactUs);

module.exports = router;
