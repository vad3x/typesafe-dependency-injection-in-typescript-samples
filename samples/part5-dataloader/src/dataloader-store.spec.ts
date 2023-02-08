import { DataLoader } from "./dataloader";
import { DataLoaderStore } from "./dataloader-store";

describe("DataLoaderStore", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should throw error given getDataLoader is called outside of runWithDataLoaders", () => {
    // arrange
    const store = new DataLoaderStore();

    const loadFnMock = jest.fn();

    // act
    // assert
    expect(() => store.getDataLoader(loadFnMock)).toThrowError();
  });

  test("should create single scope and return correct value from it given sync callback", () => {
    // arrange
    const callMock = jest.fn();

    const store = new DataLoaderStore();

    const loadFnMock = jest.fn();

    // act
    store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));
    });

    // assert
    expect(callMock).toBeCalledTimes(1);
    expect(callMock.mock.calls[0][0]).toBeInstanceOf(DataLoader);
  });

  test("should create single scope and return the same DataLoader given multiple getDataLoader calls", () => {
    // arrange
    const callMock = jest.fn();

    const store = new DataLoaderStore();

    const loadFnMock = jest.fn();

    // act
    store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));
      callMock(store.getDataLoader(loadFnMock));
      callMock(store.getDataLoader(loadFnMock));
    });

    // assert
    expect(callMock).toBeCalledTimes(3);
    expect(callMock.mock.calls[0][0]).toBeInstanceOf(DataLoader);
    expect(callMock.mock.calls[0][0]).toBe(callMock.mock.calls[1][0]);
    expect(callMock.mock.calls[0][0]).toBe(callMock.mock.calls[2][0]);
  });

  test("should create single scope and return correct value from it given async callback", async () => {
    // arrange
    const callMock = jest.fn();

    const store = new DataLoaderStore();

    const loadFnMock = jest.fn();

    // act
    await store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));

      return Promise.resolve();
    });

    // assert
    expect(callMock).toBeCalledTimes(1);
    expect(callMock.mock.calls[0][0]).toBeInstanceOf(DataLoader);
  });

  test("should create multiple scopes and return different DataLoader instances given multiple getDataLoader calls", () => {
    // arrange
    const callMock = jest.fn();

    const store = new DataLoaderStore();

    const loadFnMock = jest.fn();

    // act
    store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));
    });

    store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));
    });

    store.runWithDataLoaders(() => {
      callMock(store.getDataLoader(loadFnMock));
    });

    // assert
    expect(callMock).toBeCalledTimes(3);
    expect(callMock.mock.calls[0][0]).toBeInstanceOf(DataLoader);
    expect(callMock.mock.calls[1][0]).toBeInstanceOf(DataLoader);
    expect(callMock.mock.calls[2][0]).toBeInstanceOf(DataLoader);
    expect(callMock.mock.calls[0][0]).not.toBe(callMock.mock.calls[1][0]);
    expect(callMock.mock.calls[0][0]).not.toBe(callMock.mock.calls[2][0]);
  });
});
