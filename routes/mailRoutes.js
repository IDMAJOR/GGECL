const express = require("express");
const {
  getSentEmail,
  sendEmail,
  contactUs,
  feedbackDelete,
} = require("../controller/mailController");

const router = express.Router();

router.route("/get-email").get(getSentEmail);
router.route("/send-email").post(sendEmail);
router.route("/contact-us").post(contactUs);
router.route("/delete/:emailId").get(feedbackDelete);

module.exports = router;
