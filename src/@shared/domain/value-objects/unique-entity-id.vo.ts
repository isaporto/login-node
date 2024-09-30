import { v4 as uuidV4, validate as uuidValidate } from "uuid"
import ValueObject from "./value-object";
import InvalidUuidError from "../errors/invalid-uuid.error";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidV4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this._value);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}