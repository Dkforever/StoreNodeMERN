const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const jwt = require("jsonwebtoken");
const Customer = require("../models/customermodel");

exports.isAuthenticatedCustomer = catchAsyncErrors(async (req, res, next) => {
  // get token as bearer from the header
  const { token } = req.cookies;
  //const token = req.headers?.authorization?.split(" ")?.[1];
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please Login to Give review", 401));
  }
  const decodedData = jwt.decode(token, process.env.JWT_SECRET);

  // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.customer = await Customer.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.customer.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.customer.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
