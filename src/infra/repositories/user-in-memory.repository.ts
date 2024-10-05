import InMemoryRepository from "../../@shared/domain/repositories/in-memory.repository";
import { User } from "../../domain/entities/user/user";

export default class UserInMemoryRepository extends InMemoryRepository<User> {}