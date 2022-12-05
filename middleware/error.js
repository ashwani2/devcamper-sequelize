const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //log console for the dev
  console.log(err.stack.red);
  console.log("Error Message", error);

  if (err.name === "SequelizeUniqueConstraintError") {
    const message = `duplicate entry`;
    error = new ErrorResponse(message, 404);
  }
else if(err.name==='SequelizeEagerLoadingError'){
  // const message='Association is not working as expected'
  error=new ErrorResponse(err.message,404)
}

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
