import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "./unique-entity-id.vo";
import InvalidUuidError from "../errors/invalid-uuid.error";

describe("UniqueEntityId Unit Tests", () => {
  const idValidateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  it('should throw error when id is a invalid uuid', () => {
    expect(() => new UniqueEntityId('fake id')).toThrow(InvalidUuidError);
    expect(idValidateSpy).toHaveBeenCalledTimes(1);
  });

  it('should accept a uuid passed in constructor', () => {
    const uuid = "e288f473-6d58-4463-82b7-dfebb65ae78e";
    const uniqueEntityId = new UniqueEntityId(uuid);
    expect(uniqueEntityId.value).toBe(uuid);
    expect(idValidateSpy).toHaveBeenCalledTimes(1);
  })

  it('should create a uuid when id is empty', () => {
    const uniqueEntityId = new UniqueEntityId();
    expect(uuidValidate(uniqueEntityId.value)).toBeTruthy();
    expect(idValidateSpy).toHaveBeenCalledTimes(1);
  })
});