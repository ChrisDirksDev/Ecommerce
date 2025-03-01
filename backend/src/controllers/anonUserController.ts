import asyncHandler from "express-async-handler";
import AnonUser from "../models/anonUserModel";
import { UserRequest } from "utils/utils";

export const getAnonUser = asyncHandler(async (req, res): Promise<void> => {
  const { uuid } = (req as UserRequest).user;
  let anonUser = await AnonUser.findOne({ uuid });

  if (!anonUser) {
    anonUser = await AnonUser.create({ uuid });
  }
  res.json(anonUser);
});
