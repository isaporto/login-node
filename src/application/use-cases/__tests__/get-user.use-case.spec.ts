import { User } from "../../../domain/entities/user/user";
import NotFoundError from "../../../@shared/domain/errors/not-found.error";
import UserInMemoryRepository from "../../../infra/repositories/user-in-memory.repository";
import GetUserUseCase from "../get-user.use-case";

describe("GetUserUseCase Unit Tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase(repository);
  })

  it("should throws error when a entity not found", () => {
    expect(useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID 'fake id'`)
    );
  })

  it("should returns a user", async () => {
    const props = {
      firstName: "Johnny",
      lastName: "Bravo",
      email: "johnny.bravo@turner.com",
      password: "iampretty"
    }
    const items = [
      new User({ props })
    ]
    repository.items = items;
    const spyFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[0].id });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      firstName: "Johnny",
      lastName: "Bravo",
      email: "johnny.bravo@turner.com",
      createdAt: items[0].createdAt,
      updatedAt: items[0].updatedAt
    })
  })
})