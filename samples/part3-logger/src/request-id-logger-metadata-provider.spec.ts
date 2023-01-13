import { GetRequestId } from "./request-id";
import { RequestIdLoggerMetadataProvider } from "./request-id-logger-metadata-provider";

describe("RequestIdLoggerMetadataProvider", () => {
  const getRequestIdMock = jest.fn<ReturnType<GetRequestId>, never>();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("#getLoggerMetadata", () => {
    test("should set requestId field given GetRequestId returned undefined", () => {
      // arrange
      getRequestIdMock.mockReturnValue(undefined);

      const { getLoggerMetadata } = new RequestIdLoggerMetadataProvider(
        getRequestIdMock
      );

      // act
      const metadata = getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        requestId: undefined,
      });

      expect(getRequestIdMock).toBeCalledTimes(1);
    });

    test("should set requestId field given GetRequestId returned value", () => {
      // arrange
      getRequestIdMock.mockReturnValue("req0");

      const { getLoggerMetadata } = new RequestIdLoggerMetadataProvider(
        getRequestIdMock
      );

      // act
      const metadata = getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        requestId: "req0",
      });

      expect(getRequestIdMock).toBeCalledTimes(1);
    });

    test("should call GetRequestId multiple times given getLoggerMetadata called multiple times", () => {
      // arrange
      getRequestIdMock.mockReturnValue("req0");

      const { getLoggerMetadata } = new RequestIdLoggerMetadataProvider(
        getRequestIdMock
      );

      // act
      getLoggerMetadata();
      getLoggerMetadata();
      getLoggerMetadata();

      // assert
      expect(getRequestIdMock).toBeCalledTimes(3);
    });
  });
});
