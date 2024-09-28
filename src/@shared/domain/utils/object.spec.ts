import { deepFreeze } from "./object";

describe("object Unit Tests", () => {
  it("should not freeze scalar value", () => {
    let str = deepFreeze('string value')
    expect(str).toBe('string value')

    let bool = deepFreeze(true)
    expect(bool).toBe(true)
    bool = deepFreeze(false)
    expect(bool).toBe(false)

    let num = deepFreeze(8)
    expect(num).toBe(8)

    let nullExample = deepFreeze(null)
    expect(nullExample).toBeNull()

    let undefinedExample = deepFreeze(undefined)
    expect(undefinedExample).toBeUndefined()
  })

  it("should be a immutable object", () => {
    let objExample = deepFreeze({ prop1: "prop1 value", nested: { prop2: 'prop2 value', prop3: new Date } });
    expect(() => {
      objExample.prop1 = "it changed"
    }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'")
    expect(objExample.prop1).toStrictEqual("prop1 value")

    expect(() => {
      objExample.nested.prop2 = "it changed"
    }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'")
    expect(objExample.nested.prop2).toBe("prop2 value")

    expect(objExample.nested.prop3).toBeInstanceOf(Date)
  })
})