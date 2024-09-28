import { User, UserProperties } from "./user";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";

describe("Content Unit Tests", () => {

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


  test("getter of each non optional prop", () => {
    const user = new User(props);
    expect(user.firstName).toBe("Johnny");
    expect(user.lastName).toBe("Bravo");
    expect(user.email).toBe("johnny.bravo@turner.com");
    expect(user.password).toBe("iampretty");
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
});
