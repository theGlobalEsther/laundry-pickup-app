import AppError from "../utils/appError.js";
const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Request body must contain valid JSON" });
  }
  if(err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(error =>({
        field: error.path,
        message: error.message
    }))
     return res.status(400).json({errors})
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "Email is already declared" });
  }
  if(err.name === "JsonWebTokenError"){
    return res.status(404).json({message: "Token NOT found"})
  }
  if(err.name === "TokenExpiredError"){
    return res.status(401).json({message: "Token Expired"})
  }
  console.error(err.message);
  res.status(500).json({ message: "Internal server Error" });
};


export default errorHandler;

