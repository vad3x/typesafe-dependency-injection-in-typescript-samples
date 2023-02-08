import DataLoader, { BatchLoadFn } from "dataloader";

export { DataLoader, BatchLoadFn };

export type GetDataLoader<K = any, V = any> = (
  loadFn: BatchLoadFn<K, V>
) => DataLoader<K, V>;

export type RunWithDataLoaders = <R>(callback: (...args: any[]) => R) => R;
