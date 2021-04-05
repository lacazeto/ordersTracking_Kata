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

  it("should return payload with tracking numbers and correspondent most recent checkpoints", async () => {
    //not mocking stream input data to save some development time
    const res = await request(server)
      .post("/status")
      .send({
        trackingNumbers: ["00340000161200000001", "00331612197202003141"],
      });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      "00340000161200000001": {
        tracking_number: "00340000161200000001",
        location: "",
        timestamp: "2018-04-06T05:58:00.000Z",
        status: "Scheduled",
        status_text: "Delivery date set",
        status_details:
          "An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.",
      },
      "00331612197202003141": {
        tracking_number: "00331612197202003141",
        location: "",
        timestamp: "2020-03-01T00:00:00.000Z",
        status: "OrderProcessed",
        status_text: "Order processed",
        status_details: "The order has been processed.",
      },
    });
  });
});
