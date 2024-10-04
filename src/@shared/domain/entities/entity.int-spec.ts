import Entity, { CreateEntityProps } from "../../../@shared/domain/entities/entity";
import { FieldsErrors } from "../validators/validator-fields-interface";

type StubProperties = { prop1: string }
class StubEntity extends Entity<StubProperties> {
  validate() {
    // placeholder
  }
};

describe("Entity Integration Tests", () => {
  function messageErrors(field: string, errors: string[]) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsObject") messages.push(`${field} must be an object`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsDate") messages.push(`${field} must be a Date instance`)
    })
    return { [field]: messages};
  }

  function formatPropertyValues(property: string, values: any[]) {
    const formattedValues: any[] = [];
    values.forEach(value => {
      formattedValues.push({ [property]: value })
    })
    return formattedValues;
  }
  
  function assertPropertyInvalid(invalidValues: CreateEntityProps<{}>[], errors: FieldsErrors) {
    invalidValues.forEach((value: any) => {
      expect(() => new StubEntity(value)).containsErrorMessages(errors)
    })
  }

  test("Invalid cases for createdAt", () => {
    let invalidValues: any[] = formatPropertyValues("createdAt", [1, true, false, [], {}, "test"])
    assertPropertyInvalid(invalidValues, messageErrors("createdAt", ["IsDate"]))
  })

  test("Invalid cases for updatedAt", () => {
    let invalidValues: any[] = formatPropertyValues("updatedAt", [1, true, false, [], {}, "test"])
    assertPropertyInvalid(invalidValues, messageErrors("updatedAt", ["IsDate"]))
  })

  test("Invalid cases for props", () => {
    let invalidValues: any[] = formatPropertyValues("props", [null, undefined, ""])
    assertPropertyInvalid(invalidValues, messageErrors("props", ["IsNotEmpty", "IsObject"]))
    
    invalidValues = formatPropertyValues("props", [1, true, false, [], "test"])
    assertPropertyInvalid(invalidValues, messageErrors("props", ["IsObject"]))
  })
})