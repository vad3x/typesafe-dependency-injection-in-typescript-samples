import { GetLoggerMetadata } from "../logger-metadata";
import { GetRequestId } from "../request-id";
import { requestIdLoggerMetadata } from "./request-id-logger-metadata";
import { RequestIdLoggerMetadataProvider } from "../request-id-logger-metadata-provider";

jest.mock("../request-id-logger-metadata-provider");
const RequestIdLoggerMetadataProviderMock = jest.mocked(
  RequestIdLoggerMetadataProvider
);

describe("#requestIdLoggerMetadata", () => {
  const getRequestIdMock = jest.fn<ReturnType<GetRequestId>, never>();
  const parentGetLoggerMetadataMock = jest.fn<
    ReturnType<GetLoggerMetadata>,
    never
  >();

  const getLoggerMetadataMock = jest.fn<ReturnType<GetLoggerMetadata>, never>();

  beforeEach(() => {
    RequestIdLoggerMetadataProviderMock.mockReturnValue({
      getLoggerMetadata: getLoggerMetadataMock,
    } as any);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create registry registration with getLoggerMetadata field given to parent getLoggerMetadata passed", () => {
    // arrange
    getRequestIdMock.mockReturnValue(undefined);

    const fn = requestIdLoggerMetadata();

    // act
    const reg = fn({
      getRequestId: getRequestIdMock,
    });

    // assert
    expect(reg).toStrictEqual({
      getLoggerMetadata: expect.any(Function),
    });

    expect(RequestIdLoggerMetadataProviderMock).toBeCalledTimes(1);
    expect(RequestIdLoggerMetadataProviderMock).toBeCalledWith(
      getRequestIdMock
    );

    expect(getRequestIdMock).toBeCalledTimes(0);
  });

  describe("#getLoggerMetadata", () => {
    test("should return RequestIdLoggerMetadataProvider.getLoggerMetadata result given no parent GetLoggerMetadata", () => {
      // arrange
      getLoggerMetadataMock.mockReturnValue({
        currentMetadata: "val0",
      });

      const fn = requestIdLoggerMetadata();
      const reg = fn({
        getRequestId: getRequestIdMock,
      });

      // act
      const metadata = reg.getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        currentMetadata: "val0",
      });

      expect(getLoggerMetadataMock).toBeCalledTimes(1);
    });

    test("should merge RequestIdLoggerMetadataProvider.getLoggerMetadata and parent GetLoggerMetadata results given parant GetLoggerMetadata is registered", () => {
      // arrange
      parentGetLoggerMetadataMock.mockReturnValue({
        parentMetadata: "parent-val0",
      });

      getLoggerMetadataMock.mockReturnValue({
        currentMetadata: "val0",
      });

      const fn = requestIdLoggerMetadata();
      const reg = fn({
        getRequestId: getRequestIdMock,
        getLoggerMetadata: parentGetLoggerMetadataMock,
      });

      // act
      const metadata = reg.getLoggerMetadata();

      // assert
      expect(metadata).toStrictEqual({
        currentMetadata: "val0",
        parentMetadata: "parent-val0",
      });

      expect(RequestIdLoggerMetadataProviderMock).toBeCalledTimes(1);
      expect(RequestIdLoggerMetadataProviderMock).toBeCalledWith(
        getRequestIdMock
      );

      expect(parentGetLoggerMetadataMock).toBeCalledTimes(1);
      expect(getLoggerMetadataMock).toBeCalledTimes(1);
    });
  });
});
