import ValueObject from "./value-object";

class StubValueObject extends ValueObject { }

describe("ValueObject Tests Unit", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "new value" });
    expect(vo.value).toStrictEqual({ prop1: "new value" });
  });

  it("should be immutable", () => {
    let stubVo = new StubValueObject("string value");
    expect(() => {
      (stubVo as any)._value = "it changed"
    }).toThrow("Cannot assign to read only property '_value' of object '#<StubValueObject>'")
    expect(() => {
      (stubVo as any)["_value"] = "it changed"
    }).toThrow("Cannot assign to read only property '_value' of object '#<StubValueObject>'")

    stubVo = new StubValueObject({ prop1: "prop1 value", nested: { prop2: "prop2 value", prop3: new Date } });
    expect(() => {
      stubVo.value.prop1 = "it changed"
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")

    expect(() => {
      stubVo.value.nested.prop2 = "it changed"
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")

    expect(stubVo.value.nested.prop3).toBeInstanceOf(Date)
  })
})