import Fastify from "fastify";
import { GenerateOrderReceipt } from "../generate-order-receipt";
import { ordersRoutes } from "./orders-routes";

const generateOrderReceiptMock = jest.fn<
  ReturnType<GenerateOrderReceipt>,
  any
>();

const server = Fastify({}).register(
  ordersRoutes({
    generateOrderReceipt: generateOrderReceiptMock,
  })
);

afterEach(() => {
  jest.resetAllMocks();
});

describe("/orders/:orderId/receipt", () => {
  test("should return 404 given no item by id is found", async () => {
    // arrange
    generateOrderReceiptMock.mockResolvedValue(undefined);

    // act
    const result = await server.inject({
      method: "GET",
      path: "/orders/unknown0/receipt",
    });

    // assert
    expect(result.statusCode).toBe(404);
    expect(result.body).toBe("");

    expect(generateOrderReceiptMock).toBeCalledTimes(1);
    expect(generateOrderReceiptMock).toBeCalledWith("unknown0");
  });

  test("should return 200 with body given item by id is found", async () => {
    // arrange
    generateOrderReceiptMock.mockResolvedValue({
      total: 12,
      content: "content0",
    });

    // act
    const result = await server.inject({
      method: "GET",
      path: "/orders/id0/receipt",
    });

    // assert
    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchSnapshot("body");

    expect(generateOrderReceiptMock).toBeCalledTimes(1);
    expect(generateOrderReceiptMock).toBeCalledWith("id0");
  });
});
