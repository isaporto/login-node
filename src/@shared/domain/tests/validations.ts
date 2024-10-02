import EntityValidationError from "../errors/validation.error"
import ValidatorFields from "../validators/validator-fields"
import { FieldsErrors } from "../validators/validator-fields-interface"

type Expected = {
  validator: ValidatorFields<any>,
  validateFunction: keyof ValidatorFields<any>,
  data: any
} | (() => any)

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected()
        return {
          pass: false,
          message: () => "The data is valid"
        }
      } catch (error) {
        const entityError = error as EntityValidationError
        const messageError = `Expected: ${this.utils.printExpected(JSON.stringify(received, null, 2))}\nReceived: ${this.utils.printReceived(JSON.stringify(entityError.error, null, 2))}`

        return assertContains(received, entityError.error, messageError)
      }
    } else {
      const { validator, validateFunction, data } = expected;
      const validated = validator[validateFunction](data);
      const messageError = `The values ${JSON.stringify(data)} returned different error messages\nExpected: ${this.utils.printExpected(JSON.stringify(received, null, 2))}\nReceived: ${this.utils.printReceived(JSON.stringify(validator.errors, null, 2))}`

      if (validated) isValid()
      return assertContains(received, validator.errors, messageError)
    }
  }
})

function isValid() {
  return {
    pass: false,
    message: () => "The data is valid"
  }
}

function assertContains(expected: FieldsErrors, received: FieldsErrors, messageError: string) {
  const isMatch = expect.objectContaining(expected).asymmetricMatch(received)

  return isMatch
    ? { pass: true, message: () => "" }
    : {
      pass: false,
      message: () => messageError
    }
}