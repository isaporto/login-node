import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import ValidatorFields from "../../../@shared/domain/validators/validator-fields";
import { UserProperties } from "../../entities/user/user";

export class UserRules {
  @IsString({ groups: ['update'] })
  @IsNotEmpty({ groups: ['update'] })
  firstName: string;

  @IsString({ groups: ['update'] })
  @IsNotEmpty({ groups: ['update'] })
  lastName: string;

  @IsEmail({}, { groups: ['updateEmail'] })
  @IsString({ groups: ['updateEmail'] })
  @IsNotEmpty({ groups: ['updateEmail'] })
  email: string;

  @MaxLength(64, { groups: ['updatePassword'] })
  @MinLength(8, { groups: ['updatePassword'] })
  @IsString({ groups: ['updatePassword'] })
  @IsNotEmpty({ groups: ['updatePassword'] })
  password: string;

  constructor({ firstName, lastName, email, password }: Partial<UserProperties>) {
    Object.assign(this, { firstName, lastName, email, password });
  }
}

export class UserValidator extends ValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? {}))
  }

  validateName(data: Pick<UserProperties, "firstName" | "lastName">) {
    return super.validate(new UserRules(data), { groups: ['update'] })
  }

  validateEmail(data: Pick<UserProperties, "email">) {
    return super.validate(new UserRules(data), { groups: ['updateEmail'] })
  }

  validatePassword(data: Pick<UserProperties, "password">) {
    return super.validate(new UserRules(data), { groups: ['updatePassword'] })
  }
}

export default class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}