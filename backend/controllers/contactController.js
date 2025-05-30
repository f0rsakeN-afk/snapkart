const Contact = require("../models/contactModel");
const catchAsync = require("../utils/catchAsync");

exports.sendMessage = catchAsync(async (req, res, next) => {
  const contactMessage = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    message: "Form submitted successfully",
    data: contactMessage,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({
    status: "success",
    results: messages.length,
    data: messages,
  });
});

exports.deleteContactMessages = catchAsync(async (req, res, next) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "Message deleted successfully",
  });
});
