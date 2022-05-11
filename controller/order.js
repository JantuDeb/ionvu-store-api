const Order = require("../model/order");
const Cart = require("../model/cart");
exports.createOrder = async (req, res) => {
  const {
    address,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  try {
    const order = await Order.create({
      address,
      orderItems,
      paymentInfo,
      taxAmount,
      shippingAmount,
      totalAmount,
      user: req.userId,
    });
    if (!order)
      return res
        .status(500)
        .send({ success: false, message: "Failed to create order" });
    await Cart.deleteMany({ user: req.userId });
    
    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({"createdAt":-1});
    if (!orders || orders.length === 0)
      return res.status(404).send({ success: false, error: "No order found" });
    res.status(200).send({ success: true, orders });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete({ _id: id });
    if (!order)
      return res
        .status(400)
        .send({ success: false, error: "Failed to delete order" });

    res.status(200).send({ success: true, order });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
