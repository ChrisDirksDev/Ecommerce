import { AnonUser } from "../models";

export const fetchAnonUser = async (uuid: string) => {
  const anonUser = await AnonUser.findOneAndUpdate(
    { uuid },
    { $setOnInsert: { uuid } },
    { upsert: true, new: true }
  );
  return anonUser;
};
