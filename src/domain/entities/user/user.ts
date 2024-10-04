import UserValidatorFactory from "../../validators/user/user.validator";
import Entity from "../../../@shared/domain/entities/entity";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

export type UserProperties = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class User extends Entity<UserProperties> {
  get firstName(): string {
    return this.props.firstName;
  }
  private set firstName(value: string) {
    this.props.firstName = value;
  }

  get lastName(): string {
    return this.props.lastName;
  }
  private set lastName(value: string) {
    this.props.lastName = value;
  }

  get email(): string {
    return this.props.email;
  }
  private set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }
  private set password(value: string) {
    this.props.password = value;
  }

  update(firstName: string, lastName: string): void {
    this.validateName({
      firstName,
      lastName
    })
    this.firstName = firstName;
    this.lastName = lastName;
  }

  updateEmail(email: string): void {
    this.validateEmail({ email })
    this.email = email;
  }

  updatePassword(password: string): void {
    this.validatePassword({ password })
    this.password = password;
  }

  validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  private validateName(props: Pick<UserProperties, "firstName" | "lastName">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validateName(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  private validateEmail(props: Pick<UserProperties, "email">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validateEmail(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  private validatePassword(props: Pick<UserProperties, "password">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validatePassword(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }
}
