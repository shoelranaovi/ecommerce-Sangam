const express = require("express");
const errorHandler = require("../middleware/errorhandler");
const Address = require("../model/address.model");

const addressController = express.Router();
addressController.post("/add", async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Provide all information",
      });
    }

    const newAddress = new Address(req.body);

    await newAddress.save();

    res.status(200).json({
      message: "Address Create Successfull",
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});
addressController.get("/getall/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Provide all information",
      });
    }
    const address = await Address.find({ userId: userId });
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      message: "Address found successfully",
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});
addressController.put("/edit/:userId/:AddressId", async (req, res) => {
  try {
    const { userId, AddressId } = req.params;

    if (!userId || !AddressId) {
      return res.status(400).json({
        success: false,
        message: "Provide all information",
      });
    }
    const updateaddress = await Address.findOneAndUpdate(
      { _id: AddressId, userId },
      req.body,
      { new: true }
    );
    if (!updateaddress) {
      return res.status(400).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      message: "Address update successfully",
      success: true,
      data: updateaddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});
addressController.delete("/delete/:userId/:AddressId", async (req, res) => {
  try {
    const { userId, AddressId } = req.params;

    if (!userId || !AddressId) {
      return res.status(400).json({
        success: false,
        message: "Provide all information",
      });
    }
    const deleteaddress = await Address.findOneAndDelete({
      _id: AddressId,
      userId,
    });
    if (!deleteaddress) {
      return res.status(400).json({
        success: false,
        message: "Not Found",
      });
    }

    res.status(200).json({
      message: "Address delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
});
module.exports = addressController;
