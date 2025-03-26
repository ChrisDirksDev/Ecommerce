import { AppError } from "utils/error";
import errorHandler from "../../src/middleware/errorMiddleware";
import { Request, Response, NextFunction } from "express";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      statusCode: 200,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should set status code to 500 if status code is 200", () => {
    const error = new Error("Test error");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: expect.any(String),
    });
  });

  it("should keep the existing status code if it is not 200", () => {
    const error = new AppError("Test error", 404);

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: expect.any(String),
    });
  });

  it("should not include stack trace in production mode", () => {
    const error = new Error("Test error");
    process.env.NODE_ENV = "production";

    errorHandler(error, req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith({
      message: error.message,
      stack: null,
    });

    process.env.NODE_ENV = "test"; // Reset the environment
  });
});
