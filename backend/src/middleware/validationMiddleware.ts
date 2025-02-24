import Joi from "joi";
import e, { Response, Request } from "express";

export const validateBody =
  (Schema: Joi.ObjectSchema) => (req: Request, res: Response, next: any) => {
    const { error } = Schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({ errors: error.details.map((e) => e.message) });
    } else {
      next();
    }
  };

export const validateQuery =
  (Schema: Joi.ObjectSchema) => (req: Request, res: Response, next: any) => {
    const { error } = Schema.validate(req.query, { abortEarly: false });
    if (error) {
      res.status(400).json({ errors: error.details.map((e) => e.message) });
    } else {
      next();
    }
  };

export const validateParams =
  (Schema: Joi.ObjectSchema) => (req: Request, res: Response, next: any) => {
    const { error } = Schema.validate(req.params, { abortEarly: false });
    if (error) {
      res.status(400).json({ errors: error.details.map((e) => e.message) });
    } else {
      next();
    }
  };
