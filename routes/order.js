const express = require("express");
const { createOrder, getOrders, deleteOrder } = require("../controller/order");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/orders").post(isAuthenticated, createOrder);
router.route("/myorders").get(isAuthenticated, getOrders);
router.route("/orders/:id").delete(isAuthenticated, deleteOrder);

module.exports = router;
