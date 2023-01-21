import Fastify from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";
import { RequestId } from "../request-id";
import { runWithRequestIdPlugin } from "./run-with-request-id-plugin";

import * as uuid from "uuid";

jest.mock("uuid");
const uuidV4Mocked = jest.mocked(uuid.v4);

describe("#runWithRequestIdPlugin", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should populate request id from 'request-id' header", async () => {
    // arrange
    const alsStub = new AsyncLocalStorage<RequestId>();

    const test0CallMock = jest.fn();

    uuidV4Mocked.mockReturnValue("1");

    const server = Fastify({})
      .register(
        runWithRequestIdPlugin({
          runWithRequestId: alsStub.run.bind(alsStub),
        })
      )
      .register((fastify, _, next) => {
        fastify.get("/test0", async (_, reply) => {
          test0CallMock(alsStub.getStore());

          return reply.send();
        });

        next();
      });

    // act
    await server.inject({
      method: "GET",
      path: "/test0",
      headers: {
        "request-id": "request-id0",
      },
    });

    // assert
    expect(uuidV4Mocked).toBeCalledTimes(0);
    expect(test0CallMock).toBeCalledTimes(1);
    expect(test0CallMock.mock.calls).toMatchSnapshot();
  });

  test("should assign new request id, given single call and no 'request-id' passed", async () => {
    // arrange
    const alsStub = new AsyncLocalStorage<RequestId>();

    const test0CallMock = jest.fn();

    uuidV4Mocked.mockReturnValue("1");

    const server = Fastify({})
      .register(
        runWithRequestIdPlugin({
          runWithRequestId: alsStub.run.bind(alsStub),
        })
      )
      .register((fastify, _, next) => {
        fastify.get("/test0", async (_, reply) => {
          test0CallMock(alsStub.getStore());

          return reply.send();
        });

        next();
      });

    // act
    await server.inject({
      method: "GET",
      path: "/test0",
    });

    // assert
    expect(uuidV4Mocked).toBeCalledTimes(1);
    expect(test0CallMock).toBeCalledTimes(1);
    expect(test0CallMock.mock.calls).toMatchSnapshot();
  });

  test("should assign new request id, given multiple calls and no 'request-id' passed", async () => {
    // arrange
    const test0CallMock = jest.fn();

    const alsStub = new AsyncLocalStorage<RequestId>();

    uuidV4Mocked.mockReturnValueOnce("1");
    uuidV4Mocked.mockReturnValueOnce("2");
    uuidV4Mocked.mockReturnValueOnce("3");

    const server = Fastify({})
      .register(
        runWithRequestIdPlugin({
          runWithRequestId: alsStub.run.bind(alsStub),
        })
      )
      .register((fastify, _, next) => {
        fastify.get("/test0", async (_, reply) => {
          test0CallMock(alsStub.getStore());

          return reply.send();
        });

        next();
      });

    // act
    await server.inject({
      method: "GET",
      path: "/test0",
    });

    await server.inject({
      method: "GET",
      path: "/test0",
    });

    await server.inject({
      method: "GET",
      path: "/test0",
    });

    // assert
    expect(uuidV4Mocked).toBeCalledTimes(3);
    expect(test0CallMock).toBeCalledTimes(3);
    expect(test0CallMock.mock.calls).toMatchSnapshot();
  });
});
