import request from "supertest";
import app from "../app";
import { makeRequest } from "../testUtils";
import * as AnonUserService from "services/anonUserService";

jest.mock("services/anonUserService");
jest.mock("utils/func", () => ({
  extractUserFromRequest: jest.fn(() => "userId"),
}));

describe("AnonUser Controller", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("getAnonUser", () => {
    it("should attempt to retrieve the anon user", async () => {
      (AnonUserService.fetchAnonUser as jest.Mock).mockResolvedValue({
        userId: "userId",
      });

      const response = await makeRequest(request(app).get("/api/anon"), 200);

      expect(AnonUserService.fetchAnonUser).toHaveBeenCalledWith("userId");
      expect(response.body).toEqual({ userId: "userId" });
    });
  });
});
