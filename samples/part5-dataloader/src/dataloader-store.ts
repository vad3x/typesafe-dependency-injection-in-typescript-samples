import { AsyncLocalStorage } from "node:async_hooks";
import {
  GetDataLoader,
  RunWithDataLoaders,
  DataLoader,
  BatchLoadFn,
} from "./dataloader";

type DataLoadersMap = Map<
  BatchLoadFn<unknown, unknown>,
  DataLoader<unknown, unknown>
>;

export class DataLoaderStore {
  private readonly dataLoadersMapAls = new AsyncLocalStorage<DataLoadersMap>();

  getDataLoader: GetDataLoader = (loadFn) => {
    const dataLoadersMap = this.dataLoadersMapAls.getStore();
    if (!dataLoadersMap) {
      // throwing an exception here to simplify the cient's code
      throw new Error(
        "'getDataLoader' should not be called outside of 'runWithDataLoaders' callback"
      );
    }

    return getOrCreateDataLoader(loadFn, dataLoadersMap);
  };

  runWithDataLoaders: RunWithDataLoaders = (callback) => {
    return this.dataLoadersMapAls.run(new Map(), callback);
  };
}

function getOrCreateDataLoader(
  loadFn: BatchLoadFn<unknown, unknown>,
  dataLoadersMap: DataLoadersMap
) {
  const existingDataLoader = dataLoadersMap.get(loadFn);
  if (existingDataLoader) {
    return existingDataLoader;
  }

  const newDataLoader = new DataLoader(loadFn);
  dataLoadersMap.set(loadFn, newDataLoader);

  return newDataLoader;
}
