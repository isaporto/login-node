import ValidationError from "../../../@shared/domain/errors/validation.error";
import { User } from "./user";

describe("User Integration Tests", () => {
  function assertIsInvalid(
    props: any,
    property: string,
    invalidValues: any[],
    messageError: string
  ) {
    invalidValues.forEach((invalidValue) => {
      expect(
        () => new User({ ...props, [`${property}`]: invalidValue })
      ).toThrow(new ValidationError(messageError));
    });
  }
  const props = {
    firstName: "Johnny",
    lastName: "Bravo",
    email: "johnny.bravo@turner.com",
    password: "iampretty"
  };
  const invalidRequired = [null, undefined, ""];
  const invalidString = [1, true, [], {}];
  describe("create method", () => {
    it("should be invalid User by its name", () => {
      assertIsInvalid(props, "firstName", invalidRequired, "The firstName field is required");
      assertIsInvalid(props, "firstName", invalidString, "The firstName field must be a string");

      assertIsInvalid(props, "lastName", invalidRequired, "The lastName field is required");
      assertIsInvalid(props, "lastName", invalidString, "The lastName field must be a string");
    });

    it("should be invalid User by its email", () => {
      const invalidEmail = ["test", "a b c@email.com", "a@a"];
      assertIsInvalid(props, "email", invalidRequired, "The email field is required");
      assertIsInvalid(props, "email", invalidString, "The email field must be a string");
      assertIsInvalid(props, "email", invalidEmail, "The email field must have a valid email format");
    });

    it("should be invalid User by its password", () => {
      const invalidMaxLength = ["Why don’t skeletons fight each other? They don’t have the guts! lol"]

      assertIsInvalid(props, "password", invalidRequired, "The password field is required");
      assertIsInvalid(props, "password", invalidString, "The password field must be a string");
      assertIsInvalid(props, "password", invalidMaxLength, "The password must be less or equal than 64 characters");
    });

    it("should be a valid User", () => {
      expect.assertions(0);
      new User(props);
    });
  });

  describe("update method", () => {
    it("should be invalid User by its name", () => {
      const user = new User(props);
      invalidRequired.forEach(invalidValue => {
        expect(() => user.update(invalidValue, props.lastName)).toThrow("The firstName field is required");
        expect(() => user.update(props.firstName, invalidValue)).toThrow("The lastName field is required");
      })

      invalidString.forEach(invalidValue => {
        expect(() => user.update(invalidValue as any, props.lastName)).toThrow("The firstName field must be a string");
        expect(() => user.update(props.firstName, invalidValue as any)).toThrow("The lastName field must be a string");
      })
    });

    it("should be invalid User by its email", () => {
      const user = new User(props);
      invalidRequired.forEach(invalidValue => {
        expect(() => user.updateEmail(invalidValue)).toThrow("The email field is required");
      });

      invalidString.forEach(invalidValue => {
        expect(() => user.updateEmail(invalidValue as any)).toThrow("The email field must be a string");
      });

      const invalidEmail = ["test", "a b c@email.com", "a@a"];
      invalidEmail.forEach(invalidValue => {
        expect(() => user.updateEmail(invalidValue as any)).toThrow("The email field must have a valid email format");
      });
    });

    it("should be invalid User by its password", () => {
      const user = new User(props);
      invalidRequired.forEach(invalidValue => {
        expect(() => user.updatePassword(invalidValue)).toThrow("The password field is required");
      })

      invalidString.forEach(invalidValue => {
        expect(() => user.updatePassword(invalidValue as any)).toThrow("The password field must be a string");
      })
      expect(() => user.updatePassword("Why don’t skeletons fight each other? They don’t have the guts! lol"))
        .toThrow("The password must be less or equal than 64 characters");
    });

    it("should be a valid User", () => {
      expect.assertions(0);
      const user = new User(props);
      user.update("Dexter", "McPherson");
      user.updateEmail("dexter@geniusboy.com");
      user.updatePassword("$2a$10$TtS27kp3.Ev0r9I6KLoEHu3WxFy0y1OPpOfv0znmhiXzqMkTkqE2C");
    });
  });
});
