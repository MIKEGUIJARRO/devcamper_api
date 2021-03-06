const ErrorResponse = require("../util/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Mongoose bad objectID
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        console.log(message);
        error = new ErrorResponse(message, 400);
    }

    // Log congole for the dev
    res.status(err.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
}

module.exports = errorHandler;