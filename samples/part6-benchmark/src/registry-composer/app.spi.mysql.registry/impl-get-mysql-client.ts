import { GetMysqlClient } from "@part6-common/app.spi.mysql";

export function implGetMysqlClient() {
  return () => {
    const getMysqlClient: GetMysqlClient = () => {
      return {
        exec() {
          throw new Error("Not implemented");
        },
      };
    };

    return {
      getMysqlClient,
    };
  };
}
