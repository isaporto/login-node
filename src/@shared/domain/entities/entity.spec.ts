import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";

type StubProperties = { prop1: string, prop2: boolean }
class StubEntity extends Entity<StubProperties> {
  validate() {
    // placeholder
  }
};

describe("Entity Unit Tests", () => {
  const props = { prop1: 'Test', prop2: false };

  test("id field", () => {
    const stubDatas: { id?: any; props: StubProperties }[] = [
      { props },
      { props, id: undefined },
      { props, id: null },
      { props, id: "" },
      { props, id: new UniqueEntityId() },
    ];
    stubDatas.forEach((stubData) => {
      const stub = new StubEntity({ props: stubData.props, id: stubData.id });
      expect(stub.id).not.toBeFalsy();
      expect(stub.uniqueEntityId).not.toBeFalsy();
      expect(typeof stub.id).toBe('string');
      expect(stub.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      expect(uuidValidate(stub.id)).toBeTruthy();
    });
  });

  it('should accept a valid uuid', () => {
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity({ props, id: uniqueEntityId });
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  })

  test("getter of createdAt prop", () => {
    const createdAt = new Date("12/12/2012");
    let stub = new StubEntity({
      props,
      createdAt,
    });
    expect(stub.createdAt).toBe(createdAt);

    stub = new StubEntity({ props });
    expect(stub.createdAt).toBeInstanceOf(Date);
  });

  test("getter of updatedAt prop", () => {
    const updatedAt = new Date("12/12/2012");
    let stub = new StubEntity({
      props,
      updatedAt,
    });
    expect(stub.updatedAt).toBe(updatedAt);

    stub = new StubEntity({ props });
    expect(stub.updatedAt).toBeInstanceOf(Date);
  });

  it('should set props', () => {
    const entity = new StubEntity({ props });
    expect(entity["props"]).toStrictEqual(props);
  });

  it('should accept a valid uuid', () => {
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity({ props, id: uniqueEntityId });
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
  })
});