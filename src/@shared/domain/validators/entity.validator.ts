import { IsDate, IsNotEmpty, IsObject, IsOptional } from "class-validator";
import ValidatorFields from "./validator-fields";
import { CreateEntityProps } from "../entities/entity";

export class EntityRules {
  @IsObject()
  @IsNotEmpty()
  props: object

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  constructor({ props, createdAt, updatedAt }: CreateEntityProps<any>) {
    Object.assign(this, { props, createdAt, updatedAt });
  }
}

export class EntityValidator extends ValidatorFields<EntityRules> {
  validate(data: CreateEntityProps<any>): boolean {
    return super.validate(new EntityRules(data));
  }
}

export default class EntityValidatorFactory {
  static create() {
    return new EntityValidator();
  }
}