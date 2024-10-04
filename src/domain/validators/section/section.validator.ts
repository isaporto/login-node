import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { IsInstance, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
}