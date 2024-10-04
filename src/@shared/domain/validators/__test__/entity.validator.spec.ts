import { CreateEntityProps } from "../../../../@shared/domain/entities/entity";
import EntityValidatorFactory, { EntityValidator } from "../entity.validator";

describe("EntityValidator Tests", () => {
  let validator: EntityValidator;
  
  beforeEach(() => {
    validator = EntityValidatorFactory.create();
  })

  function messageErrors(field: string, errors: string[]) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsObject") messages.push(`${field} must be an object`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsDate") messages.push(`${field} must be a Date instance`)
    })
    return messages;
  }
  function formatPropertyValues(property: string, values: any[]) {
    const formattedValues: any[] = [];
    values.forEach(value => {
      formattedValues.push({ [property]: value })
    })
    return formattedValues;
  }
  
  function assertPropertyInvalid(property: string, values: CreateEntityProps<{}>[], errors: string[]) {
    values.forEach((value: any) => {
      expect({
        validator,
        validateFunction: "validate",
        data: value
      }).containsErrorMessages({ [property]: errors })
    })
  }

  test("Invalid cases for createdAt", () => {
    let invalidValues: any[] = formatPropertyValues("createdAt", [1, true, false, [], {}, "test"])
    assertPropertyInvalid("createdAt", invalidValues, messageErrors("createdAt", ["IsDate"]))
  })

  test("Invalid cases for updatedAt", () => {
    let invalidValues: any[] = formatPropertyValues("updatedAt", [1, true, false, [], {}, "test"])
    assertPropertyInvalid("updatedAt", invalidValues, messageErrors("updatedAt", ["IsDate"]))
  })

  test("Invalid cases for props", () => {
    let invalidValues: any[] = formatPropertyValues("props", [null, undefined, ""])
    assertPropertyInvalid("props", invalidValues, messageErrors("props", ["IsNotEmpty", "IsObject"]))
    
    invalidValues = formatPropertyValues("props", [1, true, false, [], "test"])
    assertPropertyInvalid("props", invalidValues, messageErrors("props", ["IsObject"]))
  })
})