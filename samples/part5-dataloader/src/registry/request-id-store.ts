import { RequestIdStore } from "../request-id-store";

// registry/request-id-store.ts
export function requestIdStore() {
  return () => {
    const { getRequestId, runWithRequestId } = new RequestIdStore();

    return {
      getRequestId,
      runWithRequestId,
    };
  };
}
