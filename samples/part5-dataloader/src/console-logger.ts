import { Logger } from "./logger";
import { GetLoggerMetadata } from "./logger-metadata";

// console-logger.ts
export class ConsoleLogger implements Logger {
  constructor(
    private readonly name: string,
    private readonly getLoggerMetadata: GetLoggerMetadata
  ) {}

  debug(message: string, data?: any): void {
    console.debug(message, this.stitchData(data));
  }

  info(message: string, data: any): void {
    console.info(message, this.stitchData(data));
  }

  warn(message: string, data?: any): void {
    console.warn(message, this.stitchData(data));
  }

  error(message: string, data: any): void {
    console.error(message, this.stitchData(data));
  }

  private stitchData(data: any): unknown {
    return {
      ...this.getLoggerMetadata(),
      ...data,
      logger: this.name,
    };
  }
}
