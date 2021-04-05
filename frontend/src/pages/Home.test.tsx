import { render, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Home from "./Home";
import { fetchOrdersData } from "../api";

jest.mock("../api");
const mockedFetchOrdersData = mocked(fetchOrdersData);

mockedFetchOrdersData.mockReturnValue(
  Promise.resolve([
    [
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
    ],
    {
      "00340000161200000001": {
        tracking_number: "00340000161200000001",
        location: "",
        timestamp: "2018-04-06T05:58:00.000Z",
        status: "Scheduled",
        status_text: "Delivery date set",
        status_details:
          "An appointment to make the delivery has been made. The goods will be delivered on Saturday, Apr 7th, 2018, between 9:30 am and 1:00 pm.",
      },
    },
  ])
);

test("renders Home", () => {
  const { getByText, getByPlaceholderText } = render(<Home />);

  expect(getByText("Please enter your email address to see your recent orders")).toBeDefined();
  expect(getByPlaceholderText("Email")).toBeDefined();
  expect(getByText("Send")).toBeDefined();
});

test("fetch orders after entering email and clicking send", async () => {
  const { getByText, getByPlaceholderText } = render(<Home />);

  const input = getByPlaceholderText("Email");
  const button = getByText("Send");

  fireEvent.change(input, { target: { value: "test@email.com" } });
  fireEvent.click(button);

  expect(mockedFetchOrdersData).toHaveBeenCalled();
});

test("doesnt fetch orders if no email is entered", async () => {
  const { getByText, getByPlaceholderText } = render(<Home />);

  const input = getByPlaceholderText("Email");
  const button = getByText("Send");

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(button);

  expect(mockedFetchOrdersData).not.toHaveBeenCalled();
});
