import { BuildingType, Model } from "../../../@shared/domain/types";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import ValidatorFields from "../../../@shared/domain/validators/validator-fields";
import { BuildProperties } from "../../entities/build/build";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsIn, IsInstance } from "class-validator";

export default class BuildValidatorFactory {
  static create() {
    return new BuildValidator();
  }
}

export class BuildRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(["CMAX", "FMAX"])
  @IsString()
  @IsNotEmpty()
  model: Model;

  @IsIn(["Residential", "Commercial"])
  @IsString()
  @IsNotEmpty()
  building_type: BuildingType;

  @IsInstance(UniqueEntityId, {
    message: "$property must be an instance of UniqueEntityId"
  })
  @IsNotEmpty()
  energy_company_id: UniqueEntityId;

  constructor({ name, model, building_type, energy_company_id }: BuildProperties ) {
    Object.assign(this, { name, model, building_type, energy_company_id });
  }
}

export class BuildValidator extends ValidatorFields<BuildRules> {
  validate(data: BuildProperties): boolean {
    return super.validate(new BuildRules(data))
  }
}