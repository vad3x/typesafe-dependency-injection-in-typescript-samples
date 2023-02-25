import { GetDynamodbClient } from "@part6-common/app.spi.dynamodb";

export function implGetDynamodbClient() {
  return () => {
    const getDynamodbClient: GetDynamodbClient = () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    };

    return {
      getDynamodbClient,
    };
  };
}
