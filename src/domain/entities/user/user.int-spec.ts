import EntityValidationError from "../../../@shared/domain/errors/validation.error";
import { FieldsErrors } from "../../../@shared/domain/validators/validator-fields-interface";
import { User } from "./user";

describe("User Integration Tests", () => {
  function messageErrors(field: string, errors: string[]): FieldsErrors {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsEmail") messages.push(`${field} must be an email`)
      if (error === "MaxLength") messages.push(`${field} must be shorter than or equal to 64 characters`)
      if (error === "MinLength") messages.push(`${field} must be longer than or equal to 8 characters`)
      if (error === "IsDate") messages.push(`${field} must be a Date instance`)
    })
    return { [field]: messages }
  }
  function formatPropertyValues(property: string, values: any[]) {
    const formattedValues: any[] = [];
    values.forEach(value => {
      formattedValues.push({ [property]: value })
    })
    return formattedValues;
  }

  function assertCreateIsInvalid(
    invalidValues: any[],
    errors: FieldsErrors
  ) {
    invalidValues.forEach((invalidValue) => {
      expect(() => new User({ props: invalidValue })).containsErrorMessages(errors);
    });
  }
  describe("create method", () => {
    it("should be invalid User by its firstName", () => {
      let invalidValues: any[] = formatPropertyValues("firstName", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("firstName", ["IsNotEmpty", "IsString"]));

      invalidValues = formatPropertyValues("firstName", [""])
      assertCreateIsInvalid(invalidValues, messageErrors("firstName", ["IsNotEmpty"]));

      invalidValues = formatPropertyValues("firstName", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("firstName", ["IsString"]));
    });

    it("should be invalid User by its lastName", () => {
      let invalidValues: any[] = formatPropertyValues("lastName", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("lastName", ["IsNotEmpty", "IsString"]));

      invalidValues = formatPropertyValues("lastName", [""])
      assertCreateIsInvalid(invalidValues, messageErrors("lastName", ["IsNotEmpty"]));

      invalidValues = formatPropertyValues("lastName", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("lastName", ["IsString"]));
    });

    it("should be invalid User by its email", () => {
      let invalidValues: any[] = formatPropertyValues("email", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("email", ["IsNotEmpty", "IsString", "IsEmail"]));

      invalidValues = formatPropertyValues("email", [""])
      assertCreateIsInvalid(invalidValues, messageErrors("email", ["IsNotEmpty", "IsEmail"]));

      invalidValues = formatPropertyValues("email", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("email", ["IsString", "IsEmail"]));

      invalidValues = formatPropertyValues("email", ["test", "a b c@email.com", "a@a"])
      assertCreateIsInvalid(invalidValues, messageErrors("email", ["IsEmail"]));
    });

    it("should be invalid User by its password", () => {
      let invalidValues: any[] = formatPropertyValues("password", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("password", ["IsNotEmpty", "IsString", "MinLength", 'MaxLength']));

      invalidValues = formatPropertyValues("password", [""])
      assertCreateIsInvalid(invalidValues, messageErrors("password", ["IsNotEmpty", "MinLength"]));

      invalidValues = formatPropertyValues("password", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("password", ["IsString", "MinLength", 'MaxLength']));

      invalidValues = [{ password: "a".repeat(65) }]
      assertCreateIsInvalid(invalidValues, messageErrors("password", ['MaxLength']));
    });

    it("should be a valid User", () => {
      const props = {
        firstName: "Johnny",
        lastName: "Bravo",
        email: "johnny.bravo@turner.com",
        password: "iampretty"
      }
      expect(() => new User({ props })).not.toThrow(EntityValidationError)
    });
  });

  describe("update method", () => {
    const props = { firstName: "Courage", lastName: "the Cowardly Dog", email: "courage@gmail.com", password: "murielbagge" }
    const user = new User({ props })

    it("should be invalid User by its firstName", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(invalidValue, props.lastName)).containsErrorMessages(messageErrors("firstName", ["IsNotEmpty", "IsString"]))
      })

      invalidValues = [""]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(invalidValue, props.lastName)).containsErrorMessages(messageErrors("firstName", ["IsNotEmpty"]))
      })

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(invalidValue, props.lastName)).containsErrorMessages(messageErrors("firstName", ["IsString"]))
      })
    });

    it("should be invalid User by its lastName", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(props.firstName, invalidValue)).containsErrorMessages(messageErrors("lastName", ["IsNotEmpty", "IsString"]))
      })

      invalidValues = [""]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(props.firstName, invalidValue)).containsErrorMessages(messageErrors("lastName", ["IsNotEmpty"]))
      })

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.update(props.firstName, invalidValue)).containsErrorMessages(messageErrors("lastName", ["IsString"]))
      })
    });

    it("should be invalid User by its email", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.updateEmail(invalidValue)).containsErrorMessages(messageErrors("email", ["IsNotEmpty", "IsString", "IsEmail"]))
      })

      expect(() => user.updateEmail("")).containsErrorMessages(messageErrors("email", ["IsNotEmpty", "IsEmail"]))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.updateEmail(invalidValue)).containsErrorMessages(messageErrors("email", ["IsString", "IsEmail"]))
      })

      invalidValues = ["test", "a b c@email.com", "a@a"]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.updateEmail(invalidValue)).containsErrorMessages(messageErrors("email", ["IsEmail"]))
      })
    });

    it("should be invalid User by its password", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.updatePassword(invalidValue)).containsErrorMessages(messageErrors("password", ["IsNotEmpty", "IsString", "MinLength", 'MaxLength']))
      })

      expect(() => user.updatePassword("")).containsErrorMessages(messageErrors("password", ["IsNotEmpty", "MinLength"]))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() => user.updatePassword(invalidValue)).containsErrorMessages(messageErrors("password", ["IsString", "MinLength", 'MaxLength']))
      })

      expect(() => user.updatePassword("a".repeat(65))).containsErrorMessages(messageErrors("password", ['MaxLength']))
    });

    it("should be a valid User", () => {
      expect.assertions(0);
      user.update("Dexter", "McPherson");
      user.updateEmail("dexter@geniusboy.com");
      user.updatePassword("$2a$10$TtS27kp3.Ev0r9I6KLoEHu3WxFy0y1OPpOfv0znmhiXzqMkTkqE2C");
    });
  });
});
