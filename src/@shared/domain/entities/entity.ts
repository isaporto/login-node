export abstract class Entity<Props> {
  constructor(public readonly props: Props) {};
}

export default Entity;