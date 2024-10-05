import UserInMemoryRepository from "../../../infra/repositories/user-in-memory.repository";
import CreateUserUseCase from "../create-user.use-case";

describe("CreateUserUseCase Unit Tests", () => {
  let repository: UserInMemoryRepository;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase(repository);
  })

  it("should create a user", async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const output = await useCase.execute({
      firstName: "Buttercup",
      lastName: "Utonium",
      email: "buttercup@turner.com",
      password: "punchkick"
    });
    const item = repository.items[0];

    expect(spyInsert).toHaveBeenCalledTimes(1); 
    expect(output).toStrictEqual({
      id: item.id,
      firstName: "Buttercup",
      lastName: "Utonium",
      email: "buttercup@turner.com",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    })
  })
})