
class ApiError extends  Error{
       constructor(
         message="Something went wrong...",
        statusCode=400,
        errors=[],
        stack=""
       ){
        super(message)

          this.statusCode=statusCode
          this.data=null
          this.success=false
          this.message=message
          this.errors=errors


          if(stack)
            this.stack=stack;
        else{
            Error.captureStackTrace(this, this.constructor)
        }
       }
}

export {ApiError}