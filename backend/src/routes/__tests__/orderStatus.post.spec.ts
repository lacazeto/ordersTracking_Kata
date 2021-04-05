import request from "supertest";
import server from "../../../app";

describe("orderStatus.post", () => {
  afterAll(async () => {
    server.close();
  });

  it("should return 200 when request body contains array of tracking numbers", async () => {
    const res = await request(server)
      .post("/status")
      .send({
        trackingNumbers: ["123456789"],
      });
    expect(res.status).toEqual(200);

    const res2 = await request(server)
      .post("/status")
      .send({
        trackingNumbers: ["123456789", "234567890"],
      });
    expect(res2.status).toEqual(200);
  });

  it("should return 400 when request body is incorrect", async () => {
    const res = await request(server).post("/status").send({
      trackingNumbers: "123456789",
    });
    expect(res.status).toEqual(400);

    const res2 = await request(server)
      .post("/status")
      .send({
        key: ["123456789"],
      });
    expect(res2.status).toEqual(400);

    const res3 = await request(server)
      .post("/status")
      .send({
        trackingNumbers: [123456789],
      });
    expect(res3.status).toEqual(400);
  });

  xit("should return the most rerecent checkpoint for submitted tracking_number", async () => {});
});
