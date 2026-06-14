import server from "../server";
import database from "../config/database";

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
