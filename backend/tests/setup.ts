import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Admin, User, Product, Order, Cart } from "models";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  // I initailly wanted to use DropDatabase() here but due to how unique
  // indexes are handled, I had to use deleteMany() instead.

  //clear collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
