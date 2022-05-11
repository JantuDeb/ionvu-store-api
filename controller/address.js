const req = require("express/lib/request");
const Address = require("../model/address");
exports.createAddress = async (req, res) => {
  const { name, phone, pincode, state, city, addressLine1, addressLine2, addressType } =
    req.body;
  if (!name || !city || !phone || !pincode || !state || !addressLine1)
    return res.status(400).json({
      success: false,
      error: "Provide all the fields",
    });

  try {
    const address = await Address.create({
      user: req.userId,
      name,
      phone,
      pincode,
      state,
      city,
      addressType,
      addressLine1,
      addressLine2,
    });
    return res.status(201).send({ success: true, address });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.userId });
    if (!addresses || addresses.length === 0)
      return res.status(404).send({
        success: false,
        error: "No address found",
      });

    return res.status(200).send({ success: true, addresses: addresses });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const _id = req.params.addressId;
  try {
    const address = await Address.deleteOne({ _id, user: req.userId });
    if (!address)
      return res.status(404).send({
        success: false,
        error: "No address found",
      });
    return res.status(200).send({ success: true, address });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
