import { DataLoaderStore } from "../dataloader-store";

export function dataLoaderStore() {
  return () => {
    const { getDataLoader, runWithDataLoaders } = new DataLoaderStore();

    return {
      getDataLoader,
      runWithDataLoaders,
    };
  };
}
