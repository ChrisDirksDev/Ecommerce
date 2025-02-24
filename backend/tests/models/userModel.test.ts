import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import User from "../../src/models/userModel";

describe("User Model", () => {
  it("should create and save a user successfully", async () => {
    const validUser = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(validUser.name);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.password).toBe(validUser.password);
  });

  it("should fail to create a user without required fields", async () => {
    const userWithoutRequiredField = new User({});
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.name).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    }
  });

  it("should fail to create a user with a duplicate email", async () => {
    const user1 = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await user1.save();

    const user2 = new User({
      name: "Jane Doe",
      email: "john.doe@example.com",
      password: "password456",
    });
    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(MongoServerError);
    expect((err as any).code).toBe(11000); // Duplicate key error code
  });
});
