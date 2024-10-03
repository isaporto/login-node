import EnergyCompanyValidatorFactory, { EnergyCompanyValidator } from "./energy-company.validator"

describe("EnergyCompanyValidator Tests", () => {
  let validator: EnergyCompanyValidator;

  beforeEach(() => {
    validator = EnergyCompanyValidatorFactory.create();
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
      if (error === "IsNumber") messages.push(`${field} must be a number conforming to the specified constraints`)
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

  test("Invalid cases for nominal_voltage", () => {
    let invalidValues: any[] = formatPropertyValues("nominal_voltage", [null, undefined, ""])
    assertPropertyInvalid("nominal_voltage", invalidValues, messageErrors("nominal_voltage", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("nominal_voltage", [true, false, [], {}, "test"])
    assertPropertyInvalid("nominal_voltage", invalidValues, messageErrors("nominal_voltage", ["IsNumber"]))
  })

  test("Invalid cases for residential_percent", () => {
    let invalidValues: any[] = formatPropertyValues("residential_percent", [null, undefined, ""])
    assertPropertyInvalid("residential_percent", invalidValues, messageErrors("residential_percent", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("residential_percent", [true, false, [], {}, "test"])
    assertPropertyInvalid("residential_percent", invalidValues, messageErrors("residential_percent", ["IsNumber"]))
  })

  test("Invalid cases for commercial_percent", () => {
    let invalidValues: any[] = formatPropertyValues("commercial_percent", [null, undefined, ""])
    assertPropertyInvalid("commercial_percent", invalidValues, messageErrors("commercial_percent", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("commercial_percent", [true, false, [], {}, "test"])
    assertPropertyInvalid("commercial_percent", invalidValues, messageErrors("commercial_percent", ["IsNumber"]))
  })
})