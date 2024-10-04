import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";
import SectionValidatorFactory from "../../validators/section/section.validator";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

export type SectionProperties = {
  order: number;
  from: string;
  to: string;
  distance: number;
  current: number;
  thermic_current: number;
  build_id: UniqueEntityId;
}

export class Section extends Entity<SectionProperties> {
  get order(): number {
    return this.props.order;
  }
  private set order(value: number) {
    this.props.order = value;
  }

  get from(): string {
    return this.props.from;
  }
  private set from(value: string) {
    this.props.from = value;
  }

  get to(): string {
    return this.props.to;
  }
  private set to(value: string) {
    this.props.to = value;
  }

  get distance(): number {
    return this.props.distance;
  }
  private set distance(value: number) {
    this.props.distance = value;
  }

  get current(): number {
    return this.props.current;
  }
  private set current(value: number) {
    this.props.current = value;
  }

  get thermic_current(): number {
    return this.props.thermic_current;
  }
  private set thermic_current(value: number) {
    this.props.thermic_current = value;
  }

  get build_id(): UniqueEntityId {
    return this.props.build_id;
  }

  validate(props: SectionProperties) {
    const validator = SectionValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors)
  }
}