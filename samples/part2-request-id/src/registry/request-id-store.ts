import { RequestIdStore } from "../request-id-store";

export function requestIdStore() {
  return () => {
    const { getRequestId, runWithRequestId } = new RequestIdStore();

    return {
      getRequestId,
      runWithRequestId,
    };
  };
}
