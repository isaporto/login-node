import SectionValidatorFactory, { SectionValidator } from "./section.validator";

describe("SectionValidator Tests", () => {
  let validator: SectionValidator;

  beforeEach(() => {
    validator = SectionValidatorFactory.create();
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

  function messageErrors(field: string, errors: string[]) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsInstance") messages.push(`${field} must be an instance of UniqueEntityId`)
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

  test("Invalid cases for order", () => {
    let invalidValues: any[] = formatPropertyValues("order", [null, undefined, ""])
    assertPropertyInvalid("order", invalidValues, messageErrors("order", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("order", [true, false, [], {}, "test"])
    assertPropertyInvalid("order", invalidValues, messageErrors("order", ["IsNumber"]))
  })

  test("Invalid cases for from", () => {
    let invalidValues: any[] = formatPropertyValues("from", [null, undefined])
    assertPropertyInvalid("from", invalidValues, messageErrors("from", ["IsNotEmpty", "IsString"]))

    assertPropertyInvalid("from", [{ from: "" }], messageErrors("from", ["IsNotEmpty"]))

    invalidValues = formatPropertyValues("from", [1, true, false, [], {}])
    assertPropertyInvalid("from", invalidValues, messageErrors("from", ["IsString"]))
  })

  test("Invalid cases for to", () => {
    let invalidValues: any[] = formatPropertyValues("to", [null, undefined])
    assertPropertyInvalid("to", invalidValues, messageErrors("to", ["IsNotEmpty", "IsString"]))

    assertPropertyInvalid("to", [{ to: "" }], messageErrors("to", ["IsNotEmpty"]))

    invalidValues = formatPropertyValues("to", [1, true, false, [], {}])
    assertPropertyInvalid("to", invalidValues, messageErrors("to", ["IsString"]))
  })

  test("Invalid cases for distance", () => {
    let invalidValues: any[] = formatPropertyValues("distance", [null, undefined, ""])
    assertPropertyInvalid("distance", invalidValues, messageErrors("distance", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("distance", [true, false, [], {}, "test"])
    assertPropertyInvalid("distance", invalidValues, messageErrors("distance", ["IsNumber"]))
  })

  test("Invalid cases for current", () => {
    let invalidValues: any[] = formatPropertyValues("current", [null, undefined, ""])
    assertPropertyInvalid("current", invalidValues, messageErrors("current", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("current", [true, false, [], {}, "test"])
    assertPropertyInvalid("current", invalidValues, messageErrors("current", ["IsNumber"]))
  })

  test("Invalid cases for thermic_current", () => {
    let invalidValues: any[] = formatPropertyValues("thermic_current", [null, undefined, ""])
    assertPropertyInvalid("thermic_current", invalidValues, messageErrors("thermic_current", ["IsNotEmpty", "IsNumber"]))

    invalidValues = formatPropertyValues("thermic_current", [true, false, [], {}, "test"])
    assertPropertyInvalid("thermic_current", invalidValues, messageErrors("thermic_current", ["IsNumber"]))
  })

  test("Invalid cases for build_id", () => {
    let invalidValues: any[] = formatPropertyValues("build_id", [null, undefined, ""])
    assertPropertyInvalid("build_id", invalidValues, messageErrors("build_id", ["IsNotEmpty", "IsInstance"]))

    invalidValues = formatPropertyValues("build_id", [1, true, false, {}, []])
    assertPropertyInvalid("build_id", invalidValues, messageErrors("build_id", ["IsInstance"]))
  })
})