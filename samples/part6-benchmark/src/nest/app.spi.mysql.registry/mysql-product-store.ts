import { Injectable, Inject } from "@nestjs/common";

import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";

@Injectable()
export class DecoratedMysqlProductStore extends MysqlProductStore {
  constructor(@Inject("GetMysqlClient") getMysqlClient: GetMysqlClient) {
    super(getMysqlClient);
  }
}
