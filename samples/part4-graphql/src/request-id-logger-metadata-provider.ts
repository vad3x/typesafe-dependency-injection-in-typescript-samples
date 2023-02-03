import { GetRequestId } from "./request-id";
import { GetLoggerMetadata } from "./logger-metadata";
import { RequestIdLoggerMetadata } from "./request-id-logger-metadata";

export class RequestIdLoggerMetadataProvider {
  constructor(private readonly getRequestId: GetRequestId) {}

  getLoggerMetadata: GetLoggerMetadata<RequestIdLoggerMetadata> = () => {
    return {
      requestId: this.getRequestId(),
    };
  };
}
