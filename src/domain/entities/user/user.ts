import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import UserValidatorFactory from "../../validators/user/user.validator";
import Entity from "../../../@shared/domain/entities/entity";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

export type UserProperties = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  created_at?: Date;
};

export class User extends Entity<UserProperties> {
  constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
    User.validate(props)
    super(props, id);
    this.props.created_at = this.props.created_at ?? new Date();
  }

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

  get created_at(): Date {
    return this.props.created_at;
  }

  update(firstName: string, lastName: string): void {
    User.validateName({
      firstName,
      lastName
    })
    this.firstName = firstName;
    this.lastName = lastName;
  }

  updateEmail(email: string): void {
    User.validateEmail({ email })
    this.email = email;
  }

  updatePassword(password: string): void {
    User.validatePassword({ password })
    this.password = password;
  }

  static validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  static validateName(props: Pick<UserProperties, "firstName" | "lastName">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validateName(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  static validateEmail(props: Pick<UserProperties, "email">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validateEmail(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }

  static validatePassword(props: Pick<UserProperties, "password">) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validatePassword(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }
}
