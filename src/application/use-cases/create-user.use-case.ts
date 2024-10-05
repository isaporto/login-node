import { User } from "../../domain/entities/user/user";
import UserRepository from "../../domain/repositories/user.repository";

export default class CreateUserUseCase {
  constructor(private userRepo: UserRepository) { }

  async execute(input: Input): Promise<Output> {
    const entity = new User({ props: input });
    await this.userRepo.insert(entity)
    const { id, firstName, lastName, email, createdAt, updatedAt } = entity;
    return {
      id, firstName, lastName, email, createdAt, updatedAt
    }
  }
}

export type Input = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Output = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}