import ValidatorFields from "../../../@shared/domain/validators/validator-fields";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { SectionProperties } from "domain/entities/section/section";
import { IsInstance, IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class SectionValidatorFactory {
  static create() {
    return new SectionValidator();
  }
}

export class SectionValidator extends ValidatorFields<SectionRules> {
  validate(data: SectionProperties): boolean {
    return super.validate(new SectionRules(data))
  }
}

export class SectionRules {
  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @IsNumber()
  @IsNotEmpty()
  current: number;

  @IsNumber()
  @IsNotEmpty()
  thermic_current: number;

  @IsInstance(UniqueEntityId, {
    message: "$property must be an instance of UniqueEntityId"
  })
  @IsNotEmpty()
  build_id: UniqueEntityId;

  constructor({
    order, from, to, distance, current, thermic_current, build_id
  }: SectionProperties) {
    Object.assign(this, { order, from, to, distance, current, thermic_current, build_id });
  }
}