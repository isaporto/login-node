import BuildValidatorFactory, { BuildValidator } from "./build.validator";

describe("BuildValidator Tests", () => {
  let validator: BuildValidator;

  beforeEach(() => {
    validator = BuildValidatorFactory.create();
  })

  function assertPropertyInvalid(property: string, values: any[], errors: string[]) {
    values.forEach((value: any) => {
      expect({
        validator,
        validateFunction: 'validate',
        data: value
      }).containsErrorMessages({ [property]: errors })
    })
  }

  function messageErrors(field: string, errors: string[], valuesIn?: string) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsDate") messages.push(`${field} must be a Date instance`)
      if (error === "IsIn") messages.push(`${field} must be one of the following values: ${valuesIn}`)
      if (error === "IsInstance") messages.push(`${field} must be an instance of UniqueEntityId`)
    })
    return messages;
  }

  function formatPropertyValues(property: string, values: any[]) {
    const formattedValues: any[] = [];
    values.forEach(value => {
      formattedValues.push({ [property]: value })
    })
    return formattedValues;
  }

  test("Invalid cases for name", () => {
    let invalidValues: any[] = formatPropertyValues("name", [null, undefined])
    assertPropertyInvalid("name", invalidValues, messageErrors("name", ["IsNotEmpty", "IsString"]))

    assertPropertyInvalid("name", [{ name: "" }], messageErrors("name", ["IsNotEmpty"]))

    invalidValues = formatPropertyValues("name", [1, true, false, [], {}])
    assertPropertyInvalid("name", invalidValues, messageErrors("name", ["IsString"]))
  })

  test("Invalid cases for model property", () => {
    let invalidValues: any[] = formatPropertyValues("model", [null, undefined])
    assertPropertyInvalid("model", invalidValues, messageErrors("model", ["IsNotEmpty", "IsString", "IsIn"], "CMAX, FMAX"))

    assertPropertyInvalid("model", [{ model: "" }], messageErrors("model", ["IsNotEmpty", "IsIn"], "CMAX, FMAX"))

    invalidValues = formatPropertyValues("model", [1, true, false, [], {}])
    assertPropertyInvalid("model", invalidValues, messageErrors("model", ["IsString", "IsIn"], "CMAX, FMAX"))

    assertPropertyInvalid("model", [{ model: "test" }], messageErrors("model", ["IsIn"], "CMAX, FMAX"))
  })

  test("Invalid cases for building_type", () => {
    let invalidValues: any[] = formatPropertyValues("building_type", [null, undefined])
    assertPropertyInvalid("building_type", invalidValues, messageErrors("building_type", ["IsNotEmpty", "IsString", "IsIn"], "Residential, Commercial"))

    assertPropertyInvalid("building_type", [{ building_type: "" }], messageErrors("building_type", ["IsNotEmpty", "IsIn"], "Residential, Commercial"))

    invalidValues = formatPropertyValues("building_type", [1, true, false, [], {}])
    assertPropertyInvalid("building_type", invalidValues, messageErrors("building_type", ["IsString", "IsIn"], "Residential, Commercial"))

    assertPropertyInvalid("building_type", [{ building_type: "test" }], messageErrors("building_type", ["IsIn"], "Residential, Commercial"))
  })

  test("Invalid cases for energy_company_id", () => {
    let invalidValues: any[] = formatPropertyValues("energy_company_id", [null, undefined, ""])
    assertPropertyInvalid("energy_company_id", invalidValues, messageErrors("energy_company_id", ["IsNotEmpty", "IsInstance"]))

    invalidValues = formatPropertyValues("energy_company_id", [1, true, false, {}, []])
    assertPropertyInvalid("energy_company_id", invalidValues, messageErrors("energy_company_id", ["IsInstance"]))
  })
})