import { v4 as uuidV4, validate as uuidValidate } from "uuid"
import ValueObject from "./value-object";

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidV4());
    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this._value);
    if (!isValid) {
      throw new Error('ID must be a valid UUID');
    }
  }
}