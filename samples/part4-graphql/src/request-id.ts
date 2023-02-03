export type RequestId = string;
export type GetRequestId = () => RequestId | undefined; // <-- can be undefined if called outside of actual HTTP request

export type RunWithRequestId = <R>(
  requestId: RequestId,
  callback: (...args: any[]) => R
) => R;
