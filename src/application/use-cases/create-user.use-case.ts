import { UserOutput } from "../dtos/user-output.dto";
import { User } from "../../domain/entities/user/user";
import UserRepository from "../../domain/repositories/user.repository";
import UseCase from "../../@shared/application/use-case";

export default class CreateUserUseCase implements UseCase<Input, Output> {
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

export type Output = UserOutput;