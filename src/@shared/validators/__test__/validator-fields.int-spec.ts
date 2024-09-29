import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import ValidatorFields from "../validator-fields"

type StubProperties = {
  name: string;
  price: number;
}

class StubRules {
  @MaxLength(10)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: StubProperties) {
    Object.assign(this, data)
  }
}

class StubValidatorFields extends ValidatorFields<StubRules> {
  validate(data: StubProperties): boolean {
    return super.validate(new StubRules(data))
  }
}

describe("ValidatorFields Integration Tests", () => {
  it("should validate with errors", () => {
    const stubValidator = new StubValidatorFields();
    expect(stubValidator.validate(null)).toBeFalsy();
    expect(stubValidator.errors).toStrictEqual(
      {
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 10 characters"
        ],
        price: [
          "price should not be empty",
          "price must be a number conforming to the specified constraints",
        ]
      }
    )
    expect(stubValidator.validatedData).toBeNull();
  })

  it("should be valid", () => {
    const stubValidator = new StubValidatorFields();
    expect(stubValidator.validate({ name: 'value', price: 10 })).toBeTruthy();
    expect(stubValidator.validatedData).toStrictEqual(new StubRules({ name: 'value', price: 10 }));
    expect(stubValidator.errors).toBeNull();
  })
})