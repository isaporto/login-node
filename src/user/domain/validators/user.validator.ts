import { IsDate, IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";
import ValidatorFields from "../../../@shared/domain/validators/validator-fields";
import { UserProperties } from "../entities/user";

export class UserRules {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(64)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  created_at?: Date;

  constructor({ firstName, lastName, email, password, created_at }: Partial<UserProperties>) {
    Object.assign(this, { firstName, lastName, email, password, created_at });
  }
}

export class UserValidator extends ValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? {}))
  }

  validateName(data: Pick<UserProperties, "firstName" | "lastName">) {
    return super.validate(new UserRules(data))
  }

  validateEmail(data: Pick<UserProperties, "email">) {
    return super.validate(new UserRules(data))
  }

  validatePassword(data: Pick<UserProperties, "password">) {
    return super.validate(new UserRules(data))
  }
}

export default class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}