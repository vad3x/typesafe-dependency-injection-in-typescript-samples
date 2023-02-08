import { RequestIdStore } from "./request-id-store";

describe("RequestIdStore", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create single scope and return correct value from it given sync callback", () => {
    // arrange
    const callMock = jest.fn();

    const store = new RequestIdStore();

    const requestIdStub0 = "0";

    // act
    store.runWithRequestId(requestIdStub0, () => {
      callMock(store.getRequestId());
    });

    // assert
    expect(callMock).toBeCalledTimes(1);
    expect(callMock).toBeCalledWith(requestIdStub0);
  });

  test("should create single scope and return correct value from it given async callback", async () => {
    // arrange
    const callMock = jest.fn();

    const store = new RequestIdStore();

    const requestIdStub0 = "0";

    // act
    await store.runWithRequestId(requestIdStub0, () => {
      callMock(store.getRequestId());

      return Promise.resolve();
    });

    // assert
    expect(callMock).toBeCalledTimes(1);
    expect(callMock).toBeCalledWith(requestIdStub0);
  });

  test("should create nested scopes and return correct values from it given sync callbacks", () => {
    // arrange
    const callMock = jest.fn();

    const store = new RequestIdStore();

    const requestIdStub0 = "0";
    const requestIdStub1 = "1";

    // act
    store.runWithRequestId(requestIdStub0, () => {
      callMock(store.getRequestId());
      store.runWithRequestId(requestIdStub1, () => {
        callMock(store.getRequestId());
      });
    });

    // assert
    expect(callMock).toBeCalledTimes(2);
    expect(callMock).toBeCalledWith(requestIdStub0);
    expect(callMock).toBeCalledWith(requestIdStub1);
  });

  test("should create nested scopes and return correct values from it given async callbacks", async () => {
    // arrange
    const callMock = jest.fn();

    const store = new RequestIdStore();

    const requestIdStub0 = "0";
    const requestIdStub1 = "1";

    // act
    await store.runWithRequestId(requestIdStub0, () => {
      callMock(store.getRequestId());
      return store.runWithRequestId(requestIdStub1, () => {
        callMock(store.getRequestId());

        return Promise.resolve();
      });
    });

    // assert
    expect(callMock).toBeCalledTimes(2);
    expect(callMock).toBeCalledWith(requestIdStub0);
    expect(callMock).toBeCalledWith(requestIdStub1);
  });
});
