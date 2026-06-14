import request from "supertest";
import server from "../../server";
import database from "../../config/database";

beforeAll(async () => {
  await database.authenticate();
});

describe("POST /api/v1/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server.app).post("/api/v1/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is greater than 0", async () => {
    const response = await request(server.app).post("/api/v1/products").send({
      name: "Laptop",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("should validate that the price is a number and is greater than 0", async () => {
    const response = await request(server.app).post("/api/v1/products").send({
      name: "Laptop",
      price: "Hola",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(3);
  });

  it("should create a new product", async () => {
    const response = await request(server.app).post("/api/v1/products").send({
      name: "Laptop",
      price: 1500,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(200);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("POST /api/v1/products", () => {
  it("should check if api/v1/products url exists", async () => {
    const response = await request(server.app).get("/api/v1/products");
    expect(response.status).not.toBe(404);
  });

  it("GET a JSON response with product", async () => {
    const response = await request(server.app).get("/api/v1/products");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/v1/products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server.app).get(`/api/v1/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });

  it("should check a valid ID in the URL", async () => {
    const response = await request(server.app).get(
      "/api/v1/products/not-valid-url",
    );

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("get a JSON response for a single product", async () => {
    const response = await request(server.app).get("/api/v1/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/v1/products/:id", () => {
  it("should check a valid ID in the URL", async () => {
    const response = await request(server.app)
      .put("/api/v1/products/not-valid-url")
      .send({
        name: "Monitor Curvo",
        availability: true,
        price: 300,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("should display validation error messages when updating a product", async () => {
    const response = await request(server.app).put("/api/v1/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should validate that the price is greater than 0", async () => {
    const response = await request(server.app).put("/api/v1/products/1").send({
      name: "Monitor Curvo",
      availability: true,
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Precio no válido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server.app)
      .put(`/api/v1/products/${productId}`)
      .send({
        name: "Monitor Curvo",
        availability: true,
        price: 300,
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should update an existing product with valid data", async () => {
    const response = await request(server.app).put(`/api/v1/products/1`).send({
      name: "Monitor Curvo",
      availability: true,
      price: 300,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/v1/products/:id/availability", () => {
  it("should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server.app).patch(
      `/api/v1/products/${productId}/availability`,
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  it("should update the product availability", async () => {
    const response = await request(server.app).patch(
      "/api/v1/products/1/availability",
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/v1/products/:id", () => {
  it("should check a valid ID", async () => {
    const response = await request(server.app).delete("/api/v1/products/not-valid");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server.app).delete(
      `/api/v1/products/${productId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
  });

  it("should delete a product", async () => {
    const response = await request(server.app).delete("/api/v1/products/1");

    expect(response.status).toBe(204);

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});

afterAll(async () => {
  await database.close();
});
