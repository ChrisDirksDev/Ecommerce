import mongoose from "mongoose";
import Admin from "models/adminModel";

describe("Admin Model", () => {
  it("should create and save an admin successfully", async () => {
    const validAdmin = new Admin({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    const savedAdmin = await validAdmin.save();

    expect(savedAdmin._id).toBeDefined();
    expect(savedAdmin.name).toBe(validAdmin.name);
    expect(savedAdmin.email).toBe(validAdmin.email);
    expect(savedAdmin.password).toBe(validAdmin.password);
  });

  it("should fail to create an admin without required fields", async () => {
    const adminWithoutRequiredField = new Admin({ name: "John Doe" });
    let err;
    try {
      await adminWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    if (err instanceof mongoose.Error.ValidationError) {
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    }
  });

  it("should fail to create an admin with a duplicate email", async () => {
    const admin1 = new Admin({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    await admin1.save();

    const admin2 = new Admin({
      name: "Jane Doe",
      email: "john.doe@example.com",
      password: "password456",
    });
    let err;
    try {
      const resp = await admin2.save();
      console.log(resp);
    } catch (error) {
      err = error;
    }
    expect((err as any).code).toBe(11000); // Duplicate key error code
  });
});
