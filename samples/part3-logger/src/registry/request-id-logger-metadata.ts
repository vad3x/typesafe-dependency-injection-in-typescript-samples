import { Norm } from "../registry-composer";
import { GetRequestId } from "../request-id";
import { GetLoggerMetadata, LoggerMetadata } from "../logger-metadata";
import { RequestIdLoggerMetadata } from "../request-id-logger-metadata";
import { RequestIdLoggerMetadataProvider } from "../request-id-logger-metadata-provider";

export function requestIdLoggerMetadata<TParent extends LoggerMetadata>() {
  return ({
    getRequestId,
    getLoggerMetadata,
  }: {
    getRequestId: GetRequestId;
    getLoggerMetadata?: GetLoggerMetadata<TParent>;
  }) => {
    const provider = new RequestIdLoggerMetadataProvider(getRequestId);

    return {
      getLoggerMetadata: () =>
        ({
          ...getLoggerMetadata?.(),
          ...provider.getLoggerMetadata(),
        } as Norm<TParent & RequestIdLoggerMetadata>),
    };
  };
}
