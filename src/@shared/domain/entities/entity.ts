import EntityValidationError from "../errors/validation.error";
import EntityValidatorFactory from "../validators/entity.validator";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface CreateEntityProps<Props> {
  props: Props;
  id?: UniqueEntityId;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  public readonly uniqueEntityId: UniqueEntityId;
  public readonly _createdAt: Date;
  public _updatedAt: Date;
  protected readonly props: EntityProps;

  constructor({
    props, id, createdAt, updatedAt
  }: CreateEntityProps<EntityProps>) {
    this.validateEntity({ props, createdAt, updatedAt });
    this.validate(props);

    this.uniqueEntityId = id || new UniqueEntityId();
    this.props = props;
    this._createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? new Date();
  };

  get id(): string {
    return this.uniqueEntityId.value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected abstract validate(props: EntityProps): void;

  private validateEntity({
    props, createdAt, updatedAt
  }: CreateEntityProps<EntityProps>): void {
    const validator = EntityValidatorFactory.create();
    const isValid = validator.validate({ props, createdAt, updatedAt });
    if (!isValid) throw new EntityValidationError(validator.errors)
  }
}

export default Entity;