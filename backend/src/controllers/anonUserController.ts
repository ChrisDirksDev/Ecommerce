import asyncHandler from "express-async-handler";
import { extractUserFromRequest } from "utils/func";
import * as service from "services/anonUserService";

export const getAnonUser = asyncHandler(async (req, res): Promise<void> => {
  const user = extractUserFromRequest(req);
  const anonUser = await service.fetchAnonUser(user);

  res.json(anonUser);
});
