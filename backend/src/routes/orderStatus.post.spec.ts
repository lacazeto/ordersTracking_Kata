import request from "supertest";
import server from "../../app";

describe("orderStatus.get", () => {
  afterAll(async () => {
    server.close();
  });

  it("should return 200 when request body is correct", async () => {
    const res = await request(server)
      .post("/status")
      .send({
        trackingNumbers: ["123456789"],
      });
    expect(res.status).toEqual(200);
  });
});
