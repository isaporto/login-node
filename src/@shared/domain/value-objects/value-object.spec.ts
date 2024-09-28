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
      // @ts-expect-error(2445,2540)
      stubVo._value = "it changed"
    }).toThrow(TypeError)
    expect(stubVo.value).toBe("string value")

    stubVo = new StubValueObject("string value");
    expect(() => {
      // @ts-expect-error(2540)
      stubVo["_value"] = "it changed"
    }).toThrow(TypeError)
    expect((stubVo.value)).toBe("string value")
    
    stubVo = new StubValueObject({ prop1: "prop1 value" });
    expect(() => {
      // @ts-expect-error(2540)
      stubVo["_value"] = "it changed"
    })
    expect(stubVo.value).toStrictEqual({ prop1: "prop1 value" })

    stubVo = new StubValueObject({ prop1: "prop1 value" });
    expect(() => {
      stubVo["_value"].prop1 = "it changed"
    }).toThrow(TypeError)
    expect(stubVo.value.prop1).toStrictEqual("prop1 value")

    stubVo = new StubValueObject({ prop1: { prop2: "prop2 value"} });
    expect(() => {
      stubVo["_value"].prop1.prop2 = "it changed"
    }).toThrow(TypeError)
    expect(stubVo.value.prop1.prop2).toBe("prop2 value")
  })
})