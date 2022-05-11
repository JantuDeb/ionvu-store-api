const express = require("express");
const { createAddress, getAddresses, deleteAddress } = require("../controller/address");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/user/addresses").post(isAuthenticated, createAddress).get(isAuthenticated, getAddresses);
router.route("/user/addresses/:addressId").delete(isAuthenticated, deleteAddress);

module.exports = router