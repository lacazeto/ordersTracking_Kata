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
      .post("/orders")
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

    const res2 = await request(server).post("/orders").send({
      email: "@test.com",
    });
    expect(res2.status).toEqual(400);
  });

  it("should return payload with orders correspondent to the submitted email", async () => {
    //not mocking stream input data to save some development time
    const res = await request(server).post("/orders").send({
      email: "julian@parcellab.com",
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-bag.jpg",
        articleNo: "A-B2-U",
        city: "München",
        courier: "DHL",
        destination_country_iso3: "DEU",
        email: "julian@parcellab.com",
        orderNo: "ORD-123-2018",
        product_name: "parcelLab Tote Bag",
        quantity: "1",
        street: "Landwehrstr. 39",
        tracking_number: "00340000161200000001",
        zip_code: "80336",
      },
      {
        articleImageUrl: "http://cdn.parcellab.com/img/sales-cannon/parcellab-cap.jpg",
        articleNo: "A-C1-L",
        city: "München",
        courier: "DHL",
        destination_country_iso3: "DEU",
        email: "julian@parcellab.com",
        orderNo: "ORD-123-2018",
        product_name: "parcelLab Branded Cap",
        quantity: "2",
        street: "Landwehrstr. 39",
        tracking_number: "00340000161200000001",
        zip_code: "80336",
      },
      {
        articleImageUrl: "",
        articleNo: "",
        city: "Berlin",
        courier: "DHL",
        destination_country_iso3: "DEU",
        email: "julian@parcellab.com",
        orderNo: "780XX004",
        product_name: "",
        quantity: "",
        street: "Schillerstr. 23a",
        tracking_number: "00331612197202003141",
        zip_code: "10625",
      },
    ]);
  });
});
