import Fastify from "fastify";

import { graphqlRoutes, HandleNodeRequest } from "./graphql";

const handleGraphQLNodeRequestMock = jest.fn<
  ReturnType<HandleNodeRequest>,
  any
>();

const server = Fastify({}).register(
  graphqlRoutes({
    handleGraphQLNodeRequest: handleGraphQLNodeRequestMock,
  })
);

afterEach(() => {
  jest.resetAllMocks();
});

test("should return 404 given unknown route", async () => {
  // arrange
  // act
  const result = await server.inject({
    method: "GET",
    path: "/unknown",
  });

  // assert
  expect(result.statusCode).toBe(404);

  expect(handleGraphQLNodeRequestMock).toBeCalledTimes(0);
});

describe("/graphql", () => {
  test("should call handleGraphQLNodeRequest given GET: /graphql request", async () => {
    // arrange
    handleGraphQLNodeRequestMock.mockResolvedValue({
      headers: new Headers({
        header0: "value0",
      }),
      status: 201,
      body: "body0",
    } as any);

    // act
    const result = await server.inject({
      method: "GET",
      path: "/graphql",
    });

    // assert
    expect(result.statusCode).toBe(201);
    expect(result.body).toBe("body0");

    expect(handleGraphQLNodeRequestMock).toBeCalledTimes(1);
  });

  test("should call handleGraphQLNodeRequest given POST: /graphql request", async () => {
    // arrange
    handleGraphQLNodeRequestMock.mockResolvedValue({
      headers: new Headers({
        header0: "value0",
      }),
      status: 201,
      body: "body0",
    } as any);

    // act
    const result = await server.inject({
      method: "POST",
      path: "/graphql",
    });

    // assert
    expect(result.statusCode).toBe(201);
    expect(result.body).toBe("body0");

    expect(handleGraphQLNodeRequestMock).toBeCalledTimes(1);
  });

  test("should call handleGraphQLNodeRequest given OPTIONS: /graphql request", async () => {
    // arrange
    handleGraphQLNodeRequestMock.mockResolvedValue({
      headers: new Headers({
        header0: "value0",
      }),
      status: 201,
      body: "body0",
    } as any);

    // act
    const result = await server.inject({
      method: "OPTIONS",
      path: "/graphql",
    });

    // assert
    expect(result.statusCode).toBe(201);
    expect(result.body).toBe("body0");

    expect(handleGraphQLNodeRequestMock).toBeCalledTimes(1);
  });
});
