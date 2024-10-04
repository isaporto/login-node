import { User } from "./user";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";

describe("User Unit Tests", () => {
  const props = {
    firstName: "Johnny",
    lastName: "Bravo",
    email: "johnny.bravo@turner.com",
    password: "iampretty"
  }
  let spyValidate: jest.SpyInstance;
  let user: User;

  beforeEach(() => {
    spyValidate = jest.spyOn(User.prototype as any, 'validate');
    spyValidate.mockImplementation(() => { });
    user = new User({ props });
  })

  test("Constructor of User", () => {
    expect(spyValidate).toHaveBeenCalledTimes(1);
    expect(user["props"]).toStrictEqual({
      firstName: "Johnny",
      lastName: "Bravo",
      email: "johnny.bravo@turner.com",
      password: "iampretty"
    });
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(user).toBeInstanceOf(Entity)
  });

  test("getter and setter of each non optional prop", () => {
    const propsDatas: { prop: 'firstName' | 'lastName' | 'email' | 'password'; firstValue: string; newValue: string }[] = [
      { prop: 'firstName', firstValue: 'Johnny', newValue: 'Billy' },
      { prop: 'lastName', firstValue: 'Bravo', newValue: 'William' },
      { prop: 'email', firstValue: 'johnny.bravo@turner.com', newValue: 'billy@turner.com' },
      { prop: 'password', firstValue: 'iampretty', newValue: 'password' }
    ]

    propsDatas.forEach(propData => {
      expect(user[propData.prop]).toBe(propData.firstValue);
      user[propData.prop] = propData.newValue
      expect(user[propData.prop]).toBe(propData.newValue)
    })
  });

  it("should update a user name", () => {
    const spyValidateName = jest.spyOn(User.prototype as any, 'validateName');
    spyValidateName.mockImplementation(() => { });

    user.update("Eddy", "Skipper");
    expect(spyValidateName).toHaveBeenCalledTimes(1);
    expect(user.firstName).toBe("Eddy")
    expect(user.lastName).toBe("Skipper")
  })

  it("should update a user email", () => {
    const spyValidateEmail = jest.spyOn(User.prototype as any, 'validateEmail');
    spyValidateEmail.mockImplementation(() => { });

    user.updateEmail("johnny.handsome@turner.com");
    expect(spyValidateEmail).toHaveBeenCalledTimes(1);
    expect(user.email).toBe("johnny.handsome@turner.com");
  })

  it("should update a user password", () => {
    const spyValidatePassword = jest.spyOn(User.prototype as any, 'validatePassword');
    spyValidatePassword.mockImplementation(() => { });

    user.updatePassword("iamhandsome");
    expect(spyValidatePassword).toHaveBeenCalledTimes(1);
    expect(user.password).toBe("iamhandsome");
  })
});
