import Fastify from "fastify";
import { runWithDataLoadersPlugin } from "./run-with-dataloaders-plugin";

describe("#runWithDataLoadersPlugin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should call runWithDataLoaders given one request", async () => {
    // arrange
    const runWithDataLoadersMock = jest.fn();
    runWithDataLoadersMock.mockImplementation((cb) => cb());

    const server = Fastify({})
      .register(
        runWithDataLoadersPlugin({
          runWithDataLoaders: runWithDataLoadersMock,
        })
      )
      .register((fastify, _, next) => {
        fastify.get("/test0", async (_, reply) => {
          return reply.send();
        });

        next();
      });

    // act
    await server.inject({
      method: "GET",
      path: "/test0",
      headers: {},
    });

    // assert
    expect(runWithDataLoadersMock).toBeCalledTimes(1);
  });

  test("should call runWithDataLoaders given multiple requests", async () => {
    // arrange
    const runWithDataLoadersMock = jest.fn();
    runWithDataLoadersMock.mockImplementation((cb) => cb());

    const server = Fastify({})
      .register(
        runWithDataLoadersPlugin({
          runWithDataLoaders: runWithDataLoadersMock,
        })
      )
      .register((fastify, _, next) => {
        fastify.get("/test0", async (_, reply) => {
          return reply.send();
        });

        next();
      });

    // act
    await server.inject({
      method: "GET",
      path: "/test0",
      headers: {},
    });

    await server.inject({
      method: "GET",
      path: "/test1",
      headers: {},
    });

    // assert
    expect(runWithDataLoadersMock).toBeCalledTimes(2);
  });
});
