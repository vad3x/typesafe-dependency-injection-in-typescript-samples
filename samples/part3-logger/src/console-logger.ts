import { Logger } from "./logger";
import { GetLoggerMetadata } from "./logger-metadata";

export class ConsoleLogger implements Logger {
  constructor(
    private readonly name: string,
    private readonly getLoggerMetadata: GetLoggerMetadata
  ) {}

  info(message: string, data: any): void {
    console.info(message, this.stitchData(data));
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
