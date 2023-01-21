import { AsyncLocalStorage } from "node:async_hooks";
import { GetRequestId, RequestId, RunWithRequestId } from "./request-id";

export class RequestIdStore {
  private readonly requestIdAls = new AsyncLocalStorage<RequestId>();

  getRequestId: GetRequestId = () => {
    return this.requestIdAls.getStore();
  };

  runWithRequestId: RunWithRequestId = (requestId, callback) => {
    return this.requestIdAls.run(requestId, callback);
  };
}
