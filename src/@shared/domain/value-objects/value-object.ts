import { deepFreeze } from "../utils/object";

export abstract class ValueObject<Value = any> {
  protected readonly _value: Value

  constructor(value: Value) {
    this._value = deepFreeze(value);
    Object.defineProperty(this, "_value", { configurable: false, writable: false });
  }

  get value() {
    return this._value;
  }
}

export default ValueObject;