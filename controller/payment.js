const Razorpay = require("razorpay");
exports.sendRazorpayKey = async (req, res) => {
  res.status(200).send({
    razorpaykey: process.env.RAZORPAY_API_KEY,
  });
};

exports.captureRazorpayPayment = async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  var options = {
    amount: Number(req.body.amount) * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  try {
    const myOrder = await instance.orders.create(options);
    res.status(200).send({
      success: true,
      amount: req.body.amount,
      order: myOrder,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
