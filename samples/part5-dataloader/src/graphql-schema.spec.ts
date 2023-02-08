import { GraphQLSchema, graphql } from "graphql";
import { FindOrderById } from "./find-order-by-id";
import { graphqlSchema } from "./graphql-schema";

describe("#graphqlSchema", () => {
  const findOrderByIdMock = jest.fn<
    ReturnType<FindOrderById>,
    Parameters<FindOrderById>
  >();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create registry registration with graphqlSchema field", () => {
    // arrange
    const fn = graphqlSchema();

    // act
    const reg = fn({ findOrderById: findOrderByIdMock });

    // assert
    expect(reg).toStrictEqual({
      graphqlSchema: expect.any(GraphQLSchema),
    });
  });

  describe("#graphqlSchema", () => {
    const fn = graphqlSchema();
    const reg = fn({ findOrderById: findOrderByIdMock });

    test("should query Query.order(id: _)", async () => {
      // arrange
      findOrderByIdMock.mockResolvedValue({
        id: "order-id0",
      });

      // act
      const result = await graphql({
        schema: reg.graphqlSchema,
        source: /* GraphQL */ `
          query {
            order(id: "order-id0") {
              id
            }
          }
        `,
      });

      // assert
      expect(result).toMatchSnapshot("graphql-result");

      expect(findOrderByIdMock).toBeCalledTimes(1);
      expect(findOrderByIdMock).toBeCalledWith("order-id0");
    });
  });
});
