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

  public toString = (): string => {
    if (typeof this._value !== "object") {
      try {
        return (this._value as any).toString();
      } catch (e) {
        return this._value + "";
      }
    }
    const value = (this._value as any).toString();
    return value === "[object Object]" ? JSON.stringify(this._value) : value;
  };
}

export default ValueObject;