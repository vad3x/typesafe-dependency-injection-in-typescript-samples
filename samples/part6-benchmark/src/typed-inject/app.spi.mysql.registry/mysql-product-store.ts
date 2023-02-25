import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";

export class DecoratedMysqlProductStore extends MysqlProductStore {
  public static inject = ["GetMysqlClient"] as const;

  constructor(getMysqlClient: GetMysqlClient) {
    super(getMysqlClient);
  }
}
