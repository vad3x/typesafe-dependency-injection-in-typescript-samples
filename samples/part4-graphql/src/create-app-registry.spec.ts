import { createAppRegistry } from "./create-app-registry";

describe("#createAppRegistry", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should create registry with fastifyServer", () => {
    // arrange
    // act
    const registry = createAppRegistry();

    // assert
    expect(registry).toBeDefined();
    expect(registry.fastifyServer).toBeDefined();
    expect(registry.fastifyServer.listen).toBeInstanceOf(Function);
  });
});
