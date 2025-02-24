import {
  validateBody,
  validateQuery,
  validateParams,
} from "../../src/middleware/validationMiddleware";
import Joi from "joi";
import { Request, Response } from "express";

describe("Validation Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("validateBody", () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });

    it("should call next if validation passes", () => {
      req.body = { name: "John" };

      validateBody(schema)(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should return 400 if validation fails", () => {
      req.body = {};

      validateBody(schema)(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("validateQuery", () => {
    const schema = Joi.object({
      page: Joi.number().required(),
    });

    it("should call next if validation passes", () => {
      req.query = { page: "1" };

      validateQuery(schema)(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should return 400 if validation fails", () => {
      req.query = {};

      validateQuery(schema)(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("validateParams", () => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    it("should call next if validation passes", () => {
      req.params = { id: "123" };

      validateParams(schema)(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should return 400 if validation fails", () => {
      req.params = {};

      validateParams(schema)(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        errors: expect.any(Array),
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
