import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";
import PropertyValidator from "../../../@shared/validators/property-validator";
import UserValidatorFactory from "../validators/user.validator";

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
    validator.validate(props);
  }

  static validateName(props: Pick<UserProperties, "firstName" | "lastName">) {
    const validator = UserValidatorFactory.create();
    validator.validateName(props);
  }

  static validateEmail(props: Pick<UserProperties, "email">) {
    const validator = UserValidatorFactory.create();
    validator.validateEmail(props);
  }

  static validatePassword(props: Pick<UserProperties, "password">) {
    const validator = UserValidatorFactory.create();
    validator.validatePassword(props);
  }
}
