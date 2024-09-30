import * as libClassValidator from "class-validator";
import ValidatorFields from "../validator-fields"

describe("ValidatorFields Unit Tests", () => {

  class StubValidatorFields extends ValidatorFields<{ field: string }> { }

  it("should initialize errors and validatedData as null", () => {
    const stubValidator = new StubValidatorFields();
    expect(stubValidator.errors).toBeNull();
    expect(stubValidator.validatedData).toBeNull();
  })

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([{
      property: "field",
      constraints: {
        string: "error message"
      }
    }])

    const stubValidator = new StubValidatorFields();
    expect(stubValidator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(stubValidator.errors).toStrictEqual({ field: ["error message"] })
    expect(stubValidator.validatedData).toBeNull();
  })

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([])

    const stubValidator = new StubValidatorFields();
    expect(stubValidator.validate({ field: 'value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalledTimes(1);
    expect(stubValidator.validatedData).toStrictEqual({ field: 'value' });
    expect(stubValidator.errors).toBeNull();
  })
})