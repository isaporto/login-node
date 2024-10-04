import UserValidatorFactory, { UserValidator } from "./user.validator";

describe("UserValidator Tests", () => {
  let validator: UserValidator;

  beforeEach(() => {
    validator = UserValidatorFactory.create();
  })

  type UserValidations = "validate" | "validateName" | "validateEmail" | "validatePassword"

  function assertPropertyInvalid(property: string, validation: UserValidations, values: any[], errors: string[]) {
    values.forEach((value: any) => {
      expect({
        validator,
        validateFunction: validation,
        data: value
      }).containsErrorMessages({ [property]: errors })
    })
  }

  function messageErrors(field: string, errors: string[]) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsEmail") messages.push(`${field} must be an email`)
      if (error === "MaxLength") messages.push(`${field} must be shorter than or equal to 64 characters`)
      if (error === "MinLength") messages.push(`${field} must be longer than or equal to 8 characters`)
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

  describe("Invalid cases for firstName", () => {
    test("Validator validate", () => {
      let invalidValues: any[] = formatPropertyValues("firstName", [null, undefined])
      assertPropertyInvalid("firstName", "validate", invalidValues, messageErrors("firstName", ["IsNotEmpty", "IsString"]))

      invalidValues = [{ firstName: "" }]
      assertPropertyInvalid("firstName", "validate", invalidValues, messageErrors("firstName", ["IsNotEmpty"]))

      invalidValues = formatPropertyValues("firstName", [1, true, false, [], {}])
      assertPropertyInvalid("firstName", "validate", invalidValues, messageErrors("firstName", ["IsString"]))
    })

    test("Validator validateName", () => {
      let invalidValues: any[] = formatPropertyValues("firstName", [null, undefined])
      assertPropertyInvalid("firstName", "validateName", invalidValues, messageErrors("firstName", ["IsNotEmpty", "IsString"]))

      invalidValues = [{ firstName: "" }]
      assertPropertyInvalid("firstName", "validateName", invalidValues, messageErrors("firstName", ["IsNotEmpty"]))

      invalidValues = formatPropertyValues("firstName", [1, true, false, [], {}])
      assertPropertyInvalid("firstName", "validateName", invalidValues, messageErrors("firstName", ["IsString"]))
    })
  })

  describe("Invalid cases for lastName", () => {
    test("Validator validate", () => {
      let invalidValues: any[] = formatPropertyValues("lastName", [null, undefined])
      assertPropertyInvalid("lastName", "validate", invalidValues, messageErrors("lastName", ["IsNotEmpty", "IsString"]))

      invalidValues = [{ lastName: "" }]
      assertPropertyInvalid("lastName", "validate", invalidValues, messageErrors("lastName", ["IsNotEmpty"]))

      invalidValues = formatPropertyValues("lastName", [1, true, false, [], {}])
      assertPropertyInvalid("lastName", "validate", invalidValues, messageErrors("lastName", ["IsString"]))
    })

    test("Validator validateName", () => {
      let invalidValues: any[] = formatPropertyValues("lastName", [null, undefined])
      assertPropertyInvalid("lastName", "validateName", invalidValues, messageErrors("lastName", ["IsNotEmpty", "IsString"]))

      invalidValues = [{ lastName: "" }]
      assertPropertyInvalid("lastName", "validateName", invalidValues, messageErrors("lastName", ["IsNotEmpty"]))

      invalidValues = formatPropertyValues("lastName", [1, true, false, [], {}])
      assertPropertyInvalid("lastName", "validateName", invalidValues, messageErrors("lastName", ["IsString"]))
    })
  })

  describe("Invalid cases for email", () => {
    test("Validator validate", () => {
      let invalidValues: any[] = formatPropertyValues("email", [null, undefined])
      assertPropertyInvalid("email", "validate", invalidValues, messageErrors("email", ["IsNotEmpty", "IsString", "IsEmail"]))

      invalidValues = [{ email: "" }]
      assertPropertyInvalid("email", "validate", invalidValues, messageErrors("email", ["IsNotEmpty", "IsEmail"]))

      invalidValues = formatPropertyValues("email", [1, true, false, [], {}])
      assertPropertyInvalid("email", "validate", invalidValues, messageErrors("email", ["IsString", "IsEmail"]))

      invalidValues = formatPropertyValues("email", ["test", "a b c@email.com", "a@a"])
      assertPropertyInvalid("email", "validate", invalidValues, messageErrors("email", ["IsEmail"]))
    })

    test("Validator validateEmail", () => {
      let invalidValues: any[] = formatPropertyValues("email", [null, undefined])
      assertPropertyInvalid("email", "validateEmail", invalidValues, messageErrors("email", ["IsNotEmpty", "IsString", "IsEmail"]))

      invalidValues = [{ email: "" }]
      assertPropertyInvalid("email", "validateEmail", invalidValues, messageErrors("email", ["IsNotEmpty", "IsEmail"]))

      invalidValues = formatPropertyValues("email", [1, true, false, [], {}])
      assertPropertyInvalid("email", "validateEmail", invalidValues, messageErrors("email", ["IsString", "IsEmail"]))

      invalidValues = formatPropertyValues("email", ["test", "a b c@email.com", "a@a"])
      assertPropertyInvalid("email", "validateEmail", invalidValues, messageErrors("email", ["IsEmail"]))
    })
  })

  describe("Invalid cases for password", () => {
    test("Validator validate", () => {
      let invalidValues: any[] = formatPropertyValues("password", [null, undefined])
      assertPropertyInvalid("password", "validate", invalidValues, messageErrors("password", ["IsNotEmpty", "IsString", "MinLength", 'MaxLength']))

      invalidValues = [{ password: "" }]
      assertPropertyInvalid("password", "validate", invalidValues, messageErrors("password", ["IsNotEmpty", "MinLength"]))

      invalidValues = formatPropertyValues("password", [1, true, false, {}, []])
      assertPropertyInvalid("password", "validate", invalidValues, messageErrors("password", ["IsString", "MinLength", 'MaxLength']))

      invalidValues = [{ password: "a".repeat(65) }]
      assertPropertyInvalid("password", "validatePassword", invalidValues, messageErrors("password", ["MaxLength"]))
    })

    test("Validator validatePassword", () => {
      let invalidValues: any[] = formatPropertyValues("password", [null, undefined])
      assertPropertyInvalid("password", "validatePassword", invalidValues, messageErrors("password", ["IsNotEmpty", "IsString", "MinLength", 'MaxLength']))

      invalidValues = [{ password: "" }]
      assertPropertyInvalid("password", "validatePassword", invalidValues, messageErrors("password", ["IsNotEmpty", "MinLength"]))

      invalidValues = formatPropertyValues("password", [1, true, false, [], {}])
      assertPropertyInvalid("password", "validatePassword", invalidValues, messageErrors("password", ["IsString", "Length", "MinLength", 'MaxLength']))

      invalidValues = [{ password: "a".repeat(65) }]
      assertPropertyInvalid("password", "validatePassword", invalidValues, messageErrors("password", ["MaxLength"]))
    })
  })
})