export class RegistryComposer<TNeeds extends object = object> {
  private readonly creators: CreateServices<TNeeds, object>[] = [];

  add<TServices extends object>(
    createServices: CreateServices<TNeeds, TServices>
  ): RegistryComposer<Combine<TNeeds, TServices>> {
    this.creators.push(createServices);

    return this as any;
  }

  compose(): Readonly<TNeeds> {
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

type Combine<TSource extends object, TWith extends object> = Norm<
  Omit<TSource, keyof TWith> & TWith
>;

export type Norm<T> = T extends object
  ? {
      [P in keyof T]: T[P];
    }
  : never;
