import ValidationError from "../../@shared/errors/validation.error";

export default class PropertyValidator {
  private constructor(
    private value: any,
    private property: string
  ) {}

  static values(value: any, property: string) {
    return new PropertyValidator(value, property)
  }

  required(): this{
    if (this.value === null || this.value === undefined || this.value === "") {
      throw new ValidationError(`The ${this.property} field is required`);
    };
    return this;
  }

  string(): this{
    if (!isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} field must be a string`);
    };
    return this;
  }

  boolean(): this{
    if (!isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(`The ${this.property} field must be a boolean`);
    };
    return this;
  }

  number(): this{
    if (!isEmpty(this.value) && typeof this.value !== 'number') {
      throw new ValidationError(`The ${this.property} field must be a number`);
    };
    return this;
  }

  isEmail(): this {
    if (!isEmpty(this.value) && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(this.value)) {
      throw new ValidationError(`The ${this.property} field must have a valid email format`);
    }
    return this
  }

  maxLength(max: number) {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(`The ${this.property} must be less or equal than ${max} characters`)
    }
    return this;
  }

  inclusion(options: any[]): this {
    if (!options.includes(this.value)) {
      throw new ValidationError(`This value is not a valid ${this.property}`);
    }
    return this;
  }
}

export function isEmpty(value: any) {
  return value === undefined || value === null;
}