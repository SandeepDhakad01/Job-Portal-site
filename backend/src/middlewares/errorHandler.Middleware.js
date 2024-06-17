
export const errorHandlerMiddleware=(err,req,res,next)=>{

    // err.message = err.message || "Internal Server Error";
    // err.statusCode = err.statusCode || 500;
  
    // if (err.name === "CastError") {
    //   const message = `Resource not found. Invalid ${err.path}`,
    //     err = new ErrorHandler(message, 400);
    // }
    // if (err.code === 11000) {
    //   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
    //     err = new ErrorHandler(message, 400);
    // }
    // if (err.name === "JsonWebTokenError") {
    //   const message = `Json Web Token is invalid, Try again!`;
    //   err = new ErrorHandler(message, 400);
    // }
    // if (err.name === "TokenExpiredError") {
    //   const message = `Json Web Token is expired, Try again!`;
    //   err = new ErrorHandler(message, 400);
    // }

  console.log("ye rahi appki error => ",err)
    // console.log("......................................................")

      const error={...err,message:err.message}
    return res.status(err.errStatus || 500).json(
        error
      );
    //  console.log("ye rahi appki error  ",err)
    //  return res.send("")
}