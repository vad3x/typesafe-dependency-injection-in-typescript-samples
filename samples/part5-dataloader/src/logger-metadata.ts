export type LoggerMetadata = Record<string, any>;
export type GetLoggerMetadata<T extends LoggerMetadata = LoggerMetadata> =
  () => T;
