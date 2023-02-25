import { injectable, inject } from "tsyringe";

import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";

@injectable()
export class DecoratedMysqlProductStore extends MysqlProductStore {
  constructor(@inject("GetMysqlClient") getMysqlClient: GetMysqlClient) {
    super(getMysqlClient);
  }
}
