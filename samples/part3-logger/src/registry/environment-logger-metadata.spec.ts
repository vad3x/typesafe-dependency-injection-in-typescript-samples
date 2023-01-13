import { GetLoggerMetadata } from "../logger-metadata";
import { environmentLoggerMetadata } from "./environment-logger-metadata";

describe("#environmentLoggerMetadata", () => {
  const parentGetLoggerMetadataMock = jest.fn<
    ReturnType<GetLoggerMetadata>,
    never
  >();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create registry registration with getLoggerMetadata field given to parent getLoggerMetadata passed", () => {
    // arrange
    const fn = environmentLoggerMetadata("env0");

    // act
    const reg = fn({});

    // assert
    expect(reg).toStrictEqual({
      getLoggerMetadata: expect.any(Function),
    });
  });

  describe("#getLoggerMetadata", () => {
    test("should create 'environment' field given no parent GetLoggerMetadata", () => {
      // arrange
      const fn = environmentLoggerMetadata("env0");
      const reg = fn({});

      // act
      const metadata = reg.getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        environment: "env0",
      });
    });

    test("should create 'environment' field given parent GetLoggerMetadata", () => {
      // arrange
      parentGetLoggerMetadataMock.mockReturnValue({
        parentMetadata: "parent-val0",
      });

      const fn = environmentLoggerMetadata("env0");
      const reg = fn({
        getLoggerMetadata: parentGetLoggerMetadataMock,
      });

      // act
      const metadata = reg.getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        environment: "env0",
        parentMetadata: "parent-val0",
      });

      expect(parentGetLoggerMetadataMock).toBeCalledTimes(1);
    });
  });
});
