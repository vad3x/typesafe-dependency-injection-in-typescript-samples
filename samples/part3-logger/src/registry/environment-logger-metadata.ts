import { GetLoggerMetadata } from "../logger-metadata";

export function environmentLoggerMetadata(name: string) {
  return ({ getLoggerMetadata }: { getLoggerMetadata?: GetLoggerMetadata }) => {
    return {
      getLoggerMetadata: () => ({
        ...getLoggerMetadata?.(),
        environment: name,
      }),
    };
  };
}
