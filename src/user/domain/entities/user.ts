import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";
import PropertyValidator from "../../../@shared/validators/property-validator";

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

  static validate(props: Omit<UserProperties, "created_at">) {
    User.validateName(props);
    User.validateEmail(props);
    User.validatePassword(props);
  }

  static validateName(props: Pick<UserProperties, "firstName" | "lastName">) {
    PropertyValidator.values(props.firstName, "firstName").required().string();
    PropertyValidator.values(props.lastName, "lastName").required().string();
  }

  static validateEmail(props: Pick<UserProperties, "email">) {
    PropertyValidator.values(props.email, "email").required().string().isEmail();
  }

  static validatePassword(props: Pick<UserProperties, "password">) {
    PropertyValidator.values(props.password, "password").required().string().maxLength(64);
  }
}
