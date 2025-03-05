import asyncHandler from "express-async-handler";
import { extractUserFromRequest } from "utils/func";
import { fetchAnonUser } from "services/anonUserService";

export const getAnonUser = asyncHandler(async (req, res): Promise<void> => {
  const user = extractUserFromRequest(req);
  const anonUser = await fetchAnonUser(user);

  res.json(anonUser);
});
