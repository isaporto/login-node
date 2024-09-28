import { User, UserProperties } from "./user";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { first, omit } from "lodash";

describe("User Unit Tests", () => {
  const props = {
    firstName: "Johnny",
    lastName: "Bravo",
    email: "johnny.bravo@turner.com",
    password: "iampretty"
  }

  test("Constructor of User", () => {
    let user = new User(props);
    const propsDateOmitted = omit(user.props, "created_at");

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
    const user = new User(props);
    user.update("Eddy", "Skipper");
    expect(user.firstName).toBe("Eddy")
    expect(user.lastName).toBe("Skipper")
  })

  it("should update a user email", () => {
    const user = new User(props);
    user.updateEmail("johnny.handsome@turner.com");
    expect(user.email).toBe("johnny.handsome@turner.com");
  })

  it("should update a user password", () => {
    const user = new User(props);
    user.updatePassword("iamhandsome");
    expect(user.password).toBe("iamhandsome");
  })
});
