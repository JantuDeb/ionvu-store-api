const express = require("express");
const {
  addProducts,
  getProducts,
  getProduct,
} = require("../controller/product");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/products").post(isAuthenticated, addProducts).get(getProducts);
router.route("/products/:productId").get(getProduct);

module.exports = router;
