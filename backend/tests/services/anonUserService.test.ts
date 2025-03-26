import * as AnonUserService from "services/anonUserService";
import { AnonUser } from "models";

jest.mock("models");

describe("AnonUserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAnonUser", () => {
    it("should fetch anon user", async () => {
      (AnonUser.findOneAndUpdate as jest.Mock).mockResolvedValue({ id: "123" });

      const anonUser = await AnonUserService.fetchAnonUser("123");

      expect(anonUser).toEqual({ id: "123" });
    });
  });
});
