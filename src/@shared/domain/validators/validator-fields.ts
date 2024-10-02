import { validateSync, ValidatorOptions } from "class-validator";
import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields-interface";

export default abstract class ValidatorFields<ValidatedProps> implements ValidatorFieldsInterface<ValidatedProps> {
  errors: FieldsErrors = null;
  validatedData: ValidatedProps = null;

  validate(data: any, validatorOptions?: ValidatorOptions): boolean {
    const errors = validateSync(data, validatorOptions)

    if (errors.length > 0) {
      this.errors = {}
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints)
      }
    } else {
      this.validatedData = data
    }
    return !errors.length
  }
}