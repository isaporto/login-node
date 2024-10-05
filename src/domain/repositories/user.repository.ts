import { User } from "../../domain/entities/user/user";
import { RepositoryInterface } from "../../@shared/domain/repositories/repository-contracts";

export default interface UserRepository extends RepositoryInterface<User> {}