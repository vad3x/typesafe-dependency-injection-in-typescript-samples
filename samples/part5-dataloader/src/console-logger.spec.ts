import { ConsoleLogger } from "./console-logger";
import { GetLoggerMetadata } from "./logger-metadata";

jest.mock("node:console");
describe("ConsoleLogger", () => {
  const getLoggerMetadataMock = jest.fn<ReturnType<GetLoggerMetadata>, never>();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("#info", () => {
    const infoMock = jest.spyOn(console, "info");

    test("should call console.info given metadata presented", () => {
      // arrange
      infoMock.mockReturnValue(undefined);

      getLoggerMetadataMock.mockReturnValue({
        metadata0: "metadata-value0",
      });

      const logger = new ConsoleLogger("logger0", getLoggerMetadataMock);

      // act
      logger.info("message0", { data0: "value0" });

      // assert
      expect(infoMock).toBeCalledTimes(1);
      expect(infoMock).toBeCalledWith("message0", {
        metadata0: "metadata-value0",
        data0: "value0",
        logger: "logger0",
      });
    });
  });

  describe("#error", () => {
    const errorMock = jest.spyOn(console, "error");

    test("should call console.error given metadata presented", () => {
      // arrange
      errorMock.mockReturnValue(undefined);

      getLoggerMetadataMock.mockReturnValue({
        metadata0: "metadata-value0",
      });

      const logger = new ConsoleLogger("logger0", getLoggerMetadataMock);

      // act
      logger.error("message0", { data0: "value0" });

      // assert
      expect(errorMock).toBeCalledTimes(1);
      expect(errorMock).toBeCalledWith("message0", {
        metadata0: "metadata-value0",
        data0: "value0",
        logger: "logger0",
      });
    });
  });
});
