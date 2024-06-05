import { NextFunction, Request, Response } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/handleValidationError";
import ApiError from "../../errors/apiError";

const globalMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 400;
  let message = "something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];

  if (error.name === "ValidationError") {
    const manageError = handleValidationError(error);
    statusCode = manageError.statusCode;
    message = manageError.message;
    errorMessage = manageError.errorMessage;
  } else if (error.code && error.code === 11000) {
   
    statusCode = 409;
    message = "Duplicate key error";
    const key = Object.keys(error.keyValue)[0];
    const value = error.keyValue[key];
    errorMessage = [
      {
        path: key,
        message: `The value '${value}' for '${key}' already exists.`,
      },
    ];
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessage = error.message
      ? [
          {
            path: "",
            message: error.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    errorMessage: errorMessage,
  });
  next();
};

export default globalMiddleware;
