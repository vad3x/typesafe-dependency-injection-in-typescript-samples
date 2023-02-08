import { mock } from "jest-mock-extended";
import { createSchema } from "graphql-yoga";
import { CreateLogger, Logger } from "../logger";
import { graphqlYoga } from "./graphql-yoga";

describe("#graphqlYoga", () => {
  const loggerMock = mock<Logger>();
  const createLoggerMock = jest.fn<
    ReturnType<CreateLogger>,
    Parameters<CreateLogger>
  >();

  const testFnMock = jest.fn();

  const schemaStub = createSchema({
    typeDefs: /* GraphQL */ `
      type Test {
        id: ID!
      }

      type Query {
        test(id: ID!): Test
      }
    `,
    resolvers: {
      Query: {
        test: testFnMock,
      },
    },
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create registry registration with graphqlYoga and handleGraphQLNodeRequest fields", () => {
    // arrange
    createLoggerMock.mockReturnValue(loggerMock);

    const fn = graphqlYoga();

    // act
    const reg = fn({
      createLogger: createLoggerMock,
      graphqlSchema: schemaStub,
    });

    // assert
    expect(reg).toStrictEqual({
      graphqlYoga: expect.any(Function),
      handleGraphQLNodeRequest: expect.any(Function),
    });

    expect(createLoggerMock).toBeCalledTimes(1);
    expect(createLoggerMock).toBeCalledWith("GraphQLYoga");
  });

  describe("#graphqlYoga", () => {
    test("should ", async () => {
      // arrange
      testFnMock.mockReturnValue({
        id: "id0",
      });

      const fn = graphqlYoga();
      const reg = fn({
        createLogger: createLoggerMock,
        graphqlSchema: schemaStub,
      });

      // act
      const response = await reg.graphqlYoga.fetch("http://yoga/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: /* GraphQL */ `
            query {
              test(id: "id0") {
                id
              }
            }
          `,
        }),
      });

      // assert
      expect(response.status).toBe(200);
      expect(response.json()).toMatchSnapshot("body");

      expect(testFnMock).toBeCalledTimes(1);
      expect(testFnMock).toBeCalledWith(
        undefined,
        { id: "id0" },
        expect.anything(),
        expect.anything()
      );
    });
  });
});
