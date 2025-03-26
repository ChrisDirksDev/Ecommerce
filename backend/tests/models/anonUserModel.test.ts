import mongoose from "mongoose";
import { AnonUser } from "models";

describe("Anon User Model", () => {
  it("should create and save an anon user successfully", async () => {
    const validAnonUser = new AnonUser({
      uuid: "123",
    });
    const savedAnonUser: any = await validAnonUser.save();

    expect(savedAnonUser._id).toBeDefined();
    expect(savedAnonUser.uuid).toBe(validAnonUser.uuid);
  });

  it("should fail to create an anon user without required fields", async () => {
    const anonUserWithoutRequiredField = new AnonUser();
    let err;
    try {
      const resp = await anonUserWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.uuid).toBeDefined();
    }
  });
});
