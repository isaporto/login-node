import ValidatorFields from "../validators/validator-fields"
import { FieldsErrors } from "../validators/validator-fields-interface"

type Expected = {
  validator: ValidatorFields<any>,
  validateFunction: keyof ValidatorFields<any>,
  data: any
}

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const { validator, validateFunction, data } = expected;
    const isValid = validator[validateFunction](data);

    if (isValid) {
      return {
        pass: false,
        message: () => "The data is valid"
      }
    }

    const isMatch = expect.objectContaining(received).asymmetricMatch(validator.errors)

    return isMatch
      ? { pass: true, message: () => "" }
      : {
        pass: false,
        message: () =>
          `The values ${JSON.stringify(data)} returned different error messages\nExpected: ${this.utils.printExpected(JSON.stringify(received, null, 2))}\nReceived: ${this.utils.printReceived(JSON.stringify(validator.errors, null, 2))}`
      }
  }
})