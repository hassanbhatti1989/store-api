const {CustomApiError} = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({msg: err.message})    
    }
    return res.status(err).json({msg: err})
}
module.exports = errorHandlerMiddleware