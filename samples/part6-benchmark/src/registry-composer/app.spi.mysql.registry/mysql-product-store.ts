import { GetMysqlClient, MysqlProductStore } from "@part6-common/app.spi.mysql";

export function mysqlProductStore() {
  return (deps: { getMysqlClient: GetMysqlClient }) => {
    const productStore = new MysqlProductStore(deps.getMysqlClient);

    return {
      productStore,
    };
  };
}
