import { CreateLogger } from "../logger";
import { GetLoggerMetadata } from "../logger-metadata";
import { ConsoleLogger } from "../console-logger";

export function consoleLogger() {
  return ({
    getLoggerMetadata,
  }: {
    getLoggerMetadata: GetLoggerMetadata;
  }): { createLogger: CreateLogger } => {
    return {
      createLogger: (name) => new ConsoleLogger(name, getLoggerMetadata),
    };
  };
}
