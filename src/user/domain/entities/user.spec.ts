import { User, UserProperties } from "./user";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";

describe("User Unit Tests", () => {
  const props = {
    firstName: "Johnny",
    lastName: "Bravo",
    email: "johnny.bravo@turner.com",
    password: "iampretty"
  }

  beforeEach(() => {
    User.validate = jest.fn();
  })

  test("Constructor of User", () => {
    let user = new User(props);
    const propsDateOmitted = omit(user.props, "created_at");

    expect(User.validate).toHaveBeenCalledTimes(1);
    expect(propsDateOmitted).toStrictEqual({
      firstName: "Johnny",
      lastName: "Bravo",
      email: "johnny.bravo@turner.com",
      password: "iampretty"
    });
    expect(user.props.created_at).toBeInstanceOf(Date);
  });

  test("id field", () => {
    const userDatas: { id?: any; props: UserProperties }[] = [
      { props },
      { props, id: undefined },
      { props, id: null },
      { props, id: "" },
      { props, id: new UniqueEntityId() },
    ];
    userDatas.forEach((userData) => {
      const user = new User(userData.props, userData.id);
      expect(user.id).not.toBeFalsy();
      expect(user.uniqueEntityId).not.toBeFalsy();
      expect(typeof user.id).toBe('string');
      expect(user.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of each non optional prop", () => {
    const propsDatas: { prop: 'firstName' | 'lastName' | 'email' | 'password'; firstValue: string; newValue: string }[] = [
      { prop: 'firstName', firstValue: 'Johnny', newValue: 'Billy' },
      { prop: 'lastName', firstValue: 'Bravo', newValue: 'William' },
      { prop: 'email', firstValue: 'johnny.bravo@turner.com', newValue: 'billy@turner.com' },
      { prop: 'password', firstValue: 'iampretty', newValue: 'password' }
    ]
    const user = new User(props);
    propsDatas.forEach(propData => {
      expect(user[propData.prop]).toBe(propData.firstValue);
      user[propData.prop] = propData.newValue
      expect(user[propData.prop]).toBe(propData.newValue)
    })
  });

  test("getter of created_at prop", () => {
    const created_at = new Date("12/12/2012");
    let user = new User({
      ...props,
      created_at,
    });
    expect(user.created_at).toBe(created_at);

    user = new User(props);
    expect(user.created_at).toBeInstanceOf(Date);
  });

  it("should update a user name", () => {
    User.validateName = jest.fn();
    const user = new User(props);
    expect(User.validate).toHaveBeenCalledTimes(1);

    user.update("Eddy", "Skipper");
    expect(User.validateName).toHaveBeenCalledTimes(1);
    expect(user.firstName).toBe("Eddy")
    expect(user.lastName).toBe("Skipper")
  })

  it("should update a user email", () => {
    User.validateEmail = jest.fn();
    const user = new User(props);
    expect(User.validate).toHaveBeenCalledTimes(1);

    user.updateEmail("johnny.handsome@turner.com");
    expect(User.validateEmail).toHaveBeenCalledTimes(1);
    expect(user.email).toBe("johnny.handsome@turner.com");
  })

  it("should update a user password", () => {
    User.validatePassword = jest.fn();
    const user = new User(props);
    expect(User.validate).toHaveBeenCalledTimes(1);

    user.updatePassword("iamhandsome");
    expect(User.validatePassword).toHaveBeenCalledTimes(1);
    expect(user.password).toBe("iamhandsome");
  })
});
