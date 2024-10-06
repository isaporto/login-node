import UniqueEntityId from "../../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../../@shared/domain/entities/entity";
import NotFoundError from "../../errors/not-found.error";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {
  validate() {
    //
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> { }

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;
  const props = { name: "test", price: 0 }
  const entity = new StubEntity({ props });

  beforeEach(() => (repository = new StubInMemoryRepository()));

  it("should insert a new entity", async () => {
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when a entity not found", () => {
    expect(repository.findById("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const id = new UniqueEntityId("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should find a entity by id", async () => {
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    const id = new UniqueEntityId(entity.id);
    entityFound = await repository.findById(id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should returns all entities persisted", async () => {
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities).toStrictEqual([entity]);
  });

  it("should throws error on update when a entity not found", async () => {
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID '${entity.id}'`)
    );
  });

  it("should update a entity", async () => {
    await repository.insert(entity);

    const id = new UniqueEntityId(entity.id);
    const newProps = { name: "updated", price: 1 };
    const entityUpdated = new StubEntity({ props: newProps, id });
    await repository.update(entityUpdated);
    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when a entity not found", async () => {
    expect(repository.delete("fake id")).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );

    const id = new UniqueEntityId("0adc23be-b196-4439-a42c-9b0c7c4d1058");
    expect(repository.delete(id)).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found using ID '0adc23be-b196-4439-a42c-9b0c7c4d1058'`
      )
    );
  });

  it("should delete a entity", async () => {
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
  });
});