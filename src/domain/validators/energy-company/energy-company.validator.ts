import ValidatorFields from "../../../@shared/domain/validators/validator-fields";
import { EnergyCompanyProperties } from "../../entities/energy-company/energy-company";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export default class EnergyCompanyValidatorFactory {
  static create() {
    return new EnergyCompanyValidator();
  }
}

export class EnergyCompanyRules {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  nominal_voltage: number;

  @IsNumber()
  @IsNotEmpty()
  residential_percent: number;

  @IsNumber()
  @IsNotEmpty()
  commercial_percent: number;

  constructor({ name, nominal_voltage, residential_percent, commercial_percent }: EnergyCompanyProperties ) {
    Object.assign(this, { name, nominal_voltage, residential_percent, commercial_percent });
  }
}

export class EnergyCompanyValidator extends ValidatorFields<EnergyCompanyRules> {
  validate(data: EnergyCompanyProperties): boolean {
    return super.validate(new EnergyCompanyRules(data))
  }
}