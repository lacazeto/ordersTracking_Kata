import request from "supertest";
import server from "../../../app";

describe("orderOrders.post", () => {
  afterAll(async () => {
    server.close();
  });

  it("should return 200 when request body contains a valid email", async () => {
    const res = await request(server).post("/orders").send({
      email: "test@test.com",
    });
    expect(res.status).toEqual(200);
  });

  it("should return 400 when request body is incorrect", async () => {
    const res = await request(server).post("/orders").send({
      key: "test@test.com",
    });
    expect(res.status).toEqual(400);

    const res2 = await request(server)
      .post("/status")
      .send({
        email: ["test@test.com"],
      });
    expect(res2.status).toEqual(400);
  });

  it("should return 400 when request body contains invalid email", async () => {
    const res = await request(server).post("/orders").send({
      email: "test@test",
    });
    expect(res.status).toEqual(400);

    const res2 = await request(server).post("/status").send({
      email: "@test.com",
    });
    expect(res2.status).toEqual(400);
  });
});
