import { Request } from "express";

/**
 * @interface UserRequest
 * @extends {Request}
 *
 * An extension of the standard Express `Request` interface to include
 * an optional `user` property. This property can hold any type of value,
 * typically representing the authenticated user making the request.
 *
 * @property {any} [user] - An optional property that can hold any type of value,
 * usually representing the authenticated user.
 */
export interface UserRequest extends Request {
  user?: any;
}
