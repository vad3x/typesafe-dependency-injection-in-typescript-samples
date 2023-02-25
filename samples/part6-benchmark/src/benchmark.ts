import * as fs from "fs";
import { stringify } from "csv-stringify/sync";
import Benchmark, { Event } from "benchmark";

const OPTIONS: Benchmark.Options = {};

const VANILLA = "vanilla";
const REGISTRY_COMPOSER = "registry-composer";
const TYPED_INJECT = "typed-inject";
const TSYRINGE_FROZEN = "tsyringe#frozen";
const INVERSIFY_FROZEN = "inversify#frozen";
const NEST_FROZEN = "nest#frozen";
const TSYRINGE = "tsyringe";
const INVERSIFY = "inversify";
const NEST = "nest";

(async () => {
  runColdStartBenchmarkSute();
  await runResolutionBenchmarkSute();
  runColdStartWithResolutionBenchmarkSute();
})();

function runColdStartBenchmarkSute() {
  const coldStartSuite = new Benchmark.Suite("cold-start", OPTIONS);

  coldStartSuite
    .add(VANILLA, createVanillaContainer)
    .add(REGISTRY_COMPOSER, createRegistryComposerContainer)
    .add(TYPED_INJECT, createTypedInjectContainer)
    .add(TSYRINGE_FROZEN, createTsyringeFrozenContainer)
    .add(INVERSIFY_FROZEN, createInversifyFrozenContainer)
    .add(NEST_FROZEN, {
      defer: true,
      fn: async (deferred: any) => {
        await createNestFrozenContainer();

        deferred.resolve();
      },
    })
    .add(TSYRINGE, createTsyringeContainer)
    .add(INVERSIFY, createInversifyContainer)
    .add(NEST, {
      defer: true,
      fn: async (deferred: any) => {
        await createNestContainer();

        deferred.resolve();
      },
    })
    .on("cycle", onCycle)
    .on("complete", onComplete)
    .run();
}

async function runResolutionBenchmarkSute() {
  const vanillaContainer = createVanillaContainer();
  const registryContainer = createRegistryComposerContainer();
  const typedInjectContainer = createTypedInjectContainer();
  const tsyringeFrozenContainer = createTsyringeFrozenContainer();
  const inversifyFrozenContainer = createInversifyFrozenContainer();
  const tsyringeContainer = createTsyringeContainer();
  const inversifyContainer = createInversifyContainer();
  const nestContainer = await createNestContainer();
  const nestFrozenContainer = await createNestFrozenContainer();

  const resultionSuite = new Benchmark.Suite("resolution", OPTIONS);

  resultionSuite
    .add(VANILLA, () => vanillaContainer.findUserReviewedProducts)
    .add(REGISTRY_COMPOSER, () => registryContainer.findUserReviewedProducts)
    .add(TYPED_INJECT, () =>
      typedInjectContainer.resolve("FindUserReviewedProducts")
    )
    .add(
      TSYRINGE_FROZEN,
      () => tsyringeFrozenContainer.findUserReviewedProducts
    )
    .add(
      INVERSIFY_FROZEN,
      () => inversifyFrozenContainer.findUserReviewedProducts
    )
    .add(NEST_FROZEN, () => nestFrozenContainer.findUserReviewedProducts)
    .add(TSYRINGE, () => tsyringeContainer.resolve("FindUserReviewedProducts"))
    .add(INVERSIFY, () => inversifyContainer.get("FindUserReviewedProducts"))
    .add(NEST, () => nestContainer.resolve("FindUserReviewedProducts"))
    .on("cycle", onCycle)
    .on("complete", onComplete)
    .run();
}

function runColdStartWithResolutionBenchmarkSute() {
  const resultionSuite = new Benchmark.Suite(
    "cold-start-with-resolution",
    OPTIONS
  );

  resultionSuite
    .add(VANILLA, () => createVanillaContainer().findUserReviewedProducts)
    .add(
      REGISTRY_COMPOSER,
      () => createRegistryComposerContainer().findUserReviewedProducts
    )
    .add(TYPED_INJECT, () =>
      createTypedInjectContainer().resolve("FindUserReviewedProducts")
    )
    .add(
      TSYRINGE_FROZEN,
      () => createTsyringeFrozenContainer().findUserReviewedProducts
    )
    .add(
      INVERSIFY_FROZEN,
      () => createInversifyFrozenContainer().findUserReviewedProducts
    )
    .add(NEST_FROZEN, {
      defer: true,
      fn: async (deferred: any) => {
        const container = await createNestFrozenContainer();
        container.findUserReviewedProducts;

        deferred.resolve();
      },
    })
    .add(TSYRINGE, () =>
      createTsyringeContainer().resolve("FindUserReviewedProducts")
    )
    .add(INVERSIFY, () =>
      createInversifyContainer().get("FindUserReviewedProducts")
    )
    .add(NEST, {
      defer: true,
      fn: async (deferred: any) => {
        const container = await createNestContainer();
        container.resolve("FindUserReviewedProducts");

        deferred.resolve();
      },
    })
    .on("cycle", onCycle)
    .on("complete", onComplete)
    .run();
}

function onCycle(this: Benchmark.Suite, event: Event) {
  console.log(`[${this.name}] ${event.target}`);
}

function onComplete(this: Benchmark.Suite) {
  const benchmarks: Benchmark[] = this.map((s: Benchmark) => s);

  const results = benchmarks.map((b) => [
    b.name,
    b.hz.toFixed(b.hz < 100 ? 2 : 0),
    b.stats.rme.toFixed(2),
  ]);

  const data = [["name", "ops/sec", "rme"], ...results];

  fs.writeFileSync(
    `result-${this.name}-${new Date().toISOString()}.csv`,
    stringify(data)
  );

  console.log("\n");
}

function createVanillaContainer() {
  const { container } = requireUncached("./vanilla/index");

  return container;
}

function createRegistryComposerContainer() {
  const { container } = requireUncached("./registry-composer/index");

  return container;
}

function createTypedInjectContainer() {
  const { container } = requireUncached("./typed-inject/index");

  return container;
}

import type { DependencyContainer } from "tsyringe";

function createTsyringeContainer(): DependencyContainer {
  requireUncached("reflect-metadata");
  requireUncached("tsyringe");

  const { container } = requireUncached("./tsyringe/index");

  return container;
}

function createTsyringeFrozenContainer(): any {
  requireUncached("reflect-metadata");
  requireUncached("tsyringe");

  const { container } = requireUncached("./tsyringe/index-frozen");

  return container;
}

import type { Container } from "inversify";

function createInversifyContainer(): Container {
  requireUncached("reflect-metadata");
  requireUncached("inversify");

  const { container } = requireUncached("./inversify/index");

  return container;
}

function createInversifyFrozenContainer(): any {
  requireUncached("reflect-metadata");
  requireUncached("inversify");

  const { container } = requireUncached("./inversify/index-frozen");

  return container;
}

async function createNestContainer() {
  requireUncached("reflect-metadata");
  requireUncached("@nestjs/core");
  requireUncached("@nestjs/common");

  const { createContainer } = requireUncached("./nest/index");

  return createContainer();
}

async function createNestFrozenContainer() {
  requireUncached("reflect-metadata");
  requireUncached("@nestjs/core");
  requireUncached("@nestjs/common");

  const { createFrozenContainer } = requireUncached("./nest/index-frozen");

  return createFrozenContainer();
}

function requireUncached(module: string) {
  delete require.cache[require.resolve(module)];
  return require(module);
}
