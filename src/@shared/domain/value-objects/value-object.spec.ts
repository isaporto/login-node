import ValueObject from "./value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Tests Unit", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "new value" });
    expect(vo.value).toStrictEqual({ prop1: "new value" });
  });
})