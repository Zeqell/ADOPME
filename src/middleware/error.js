
import { EErrors } from "../services/errors/enum.js"

const errorHandler = (error, req, res, next)=>{
  console.log(error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPE:
      res.send({status:"error", error: error.name})
      break;
  
    default:
      res.send({status: "error", error: "unknown error"})
      break;
  }
}

export default errorHandler