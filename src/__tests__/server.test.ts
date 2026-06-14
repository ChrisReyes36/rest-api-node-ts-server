import request from "supertest";
import server from "../server";
import database from "../config/database";

// describe("Nuestro primer test", () => {
//   it("Debe revisar que 1 + 1 sean 2", () => {
//     expect(1 + 1).toBe(2);
//   });
// });

describe("GET /api/v1", () => {
  it("should sen back a json response", async () => {
    const response = await request(server.app).get("/api/v1");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.msg).toBe("Desde API");

    expect(response.status).not.toBe(404);
    expect(response.body.msg).not.toBe("desde api");
  });
});

jest.mock("../config/database");

describe("connectDB", () => {
  it("should handle database connection error", async () => {
    jest
      .spyOn(database, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la BD"));
    const consoleSpy = jest.spyOn(console, "log");

    await server.connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la BD"),
    );
  });
});
