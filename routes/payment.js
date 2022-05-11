const express = require("express");
const { sendRazorpayKey, captureRazorpayPayment } = require("../controller/payment");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/paymentkey").get(isAuthenticated, sendRazorpayKey);

router.route("/capturerazorpay").post(isAuthenticated, captureRazorpayPayment);

module.exports = router;
