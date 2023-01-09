export class RegistryComposer<TNeeds> {
  private readonly creators: CreateServices<TNeeds, object>[] = [];

  add<TServices extends object>(
    createServices: CreateServices<TNeeds, TServices>
  ): RegistryComposer<Norm<TNeeds & TServices>> {
    this.creators.push(createServices);

    return this as RegistryComposer<Norm<TNeeds & TServices>>;
  }

  compose(): Readonly<Norm<TNeeds>> {
    return Object.freeze(
      this.creators.reduce((state, createServices) => {
        return Object.assign(state, createServices(state));
      }, {} as any)
    );
  }
}

type CreateServices<TNeeds, TServices extends object> = (
  needs: TNeeds
) => TServices;

type Norm<T> = T extends object
  ? {
      [P in keyof T]: T[P];
    }
  : never;
