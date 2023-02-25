import { decorate, injectable, inject } from "inversify";

import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";

decorate(injectable(), MysqlProductStore);

@injectable()
export class DecoratedMysqlProductStore extends MysqlProductStore {
  constructor(@inject("GetMysqlClient") getMysqlClient: GetMysqlClient) {
    super(getMysqlClient);
  }
}
