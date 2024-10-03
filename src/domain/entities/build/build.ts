import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";
import { BuildingType, Model } from "../../../@shared/domain/types";
import BuildValidatorFactory from "../../validators/build/build.validator";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

export type BuildProperties = {
  name: string;
  model: Model;
  building_type: BuildingType;
  energy_company_id: UniqueEntityId;
  created_at?: Date;
};

export class Build extends Entity<BuildProperties> {
  constructor(public readonly props: BuildProperties, id?: UniqueEntityId) {
    Build.validate(props)
    super(props, id);
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name = value;
  }

  get model(): Model {
    return this.props.model;
  }
  private set model(value: Model) {
    this.props.model = value;
  }

  get building_type(): BuildingType {
    return this.props.building_type;
  }
  private set building_type(value: BuildingType) {
    this.props.building_type = value;
  }

  get energy_company_id(): UniqueEntityId {
    return this.props.energy_company_id;
  }
  private set energy_company_id(value: UniqueEntityId) {
    this.props.energy_company_id = value;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  update(name: string, model: Model, building_type: BuildingType, energy_company_id: UniqueEntityId): void {
    Build.validate({ name, model, building_type, energy_company_id })
    this.name = name;
    this.model = model;
    this.building_type = building_type;
    this.energy_company_id = energy_company_id;
  }

  static validate(props: BuildProperties) {
    const validator = BuildValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }
}
