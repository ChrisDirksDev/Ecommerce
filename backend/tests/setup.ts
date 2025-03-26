import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

jest.mock("middleware/authMiddleware", () => ({
  adminAuth: jest
    .fn()
    .mockImplementation(
      (req = { user: { id: "string" } }, res: any, next: () => void) => {
        req.user = { id: "adminId" };
        next();
      }
    ),
  userAuth: jest
    .fn()
    .mockImplementation(
      (
        req = { user: { id: "string", anonId: "string", admin: false } },
        res: any,
        next: () => void
      ) => {
        req.user = { id: "userId", anonId: "anonUserId", admin: false };
        next();
      }
    ),
}));

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
