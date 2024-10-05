import { UserOutput } from "../dtos/user-output.dto";
import UserRepository from "../../domain/repositories/user.repository";
import UseCase from "../../@shared/application/use-case";

export default class GetUserUseCase implements UseCase<Input, Output> {
  constructor(private userRepo: UserRepository) { }

  async execute(input: Input): Promise<Output> {
    const entity = await this.userRepo.findById(input.id);
    const { id, firstName, lastName, email, createdAt, updatedAt } = entity;
    return {
      id, firstName, lastName, email, createdAt, updatedAt
    }
  }
}

export type Input = {
  id: string;
};

export type Output = UserOutput;
