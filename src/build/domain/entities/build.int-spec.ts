import { Build, BuildProperties } from "./build";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { FieldsErrors } from "../../../@shared/domain/validators/validator-fields-interface";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

describe("Build Integration Tests", () => {
  function messageErrors(field: string, errors: string[], valuesIn?: string) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsDate") messages.push(`${field} must be a Date instance`)
      if (error === "IsIn") messages.push(`${field} must be one of the following values: ${valuesIn}`)
      if (error === "IsInstance") messages.push(`${field} must be an instance of UniqueEntityId`)
    })
    return { [field]: messages };
  }
  function formatPropertyValues(property: string, values: any[]) {
    const formattedValues: any[] = [];
    values.forEach(value => {
      formattedValues.push({ [property]: value })
    })
    return formattedValues;
  }
  function assertCreateIsInvalid(
    invalidValues: any[],
    errors: FieldsErrors
  ) {
    invalidValues.forEach((invalidValue) => {
      expect(() => new Build(invalidValue)).containsErrorMessages(errors);
    });
  }

  describe("create method", () => {
    it("should be invalid Build by its name", () => {
      let invalidValues: any[] = formatPropertyValues("name", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("name", ["IsNotEmpty", "IsString"]));

      assertCreateIsInvalid([{ name: "" }], messageErrors("name", ["IsNotEmpty"]));

      invalidValues = formatPropertyValues("name", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("name", ["IsString"]));
    });

    it("should be invalid Build by its model property", () => {
      let invalidValues: any[] = formatPropertyValues("model", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("model", ["IsNotEmpty", "IsString", "IsIn"], "CMAX, FMAX"))

      assertCreateIsInvalid([{ model: "" }], messageErrors("model", ["IsNotEmpty", "IsIn"], "CMAX, FMAX"))

      invalidValues = formatPropertyValues("model", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("model", ["IsString", "IsIn"], "CMAX, FMAX"))

      assertCreateIsInvalid([{ model: "test" }], messageErrors("model", ["IsIn"], "CMAX, FMAX"))
    })

    it("should be invalid Build by its building_type", () => {
      let invalidValues: any[] = formatPropertyValues("building_type", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("building_type", ["IsNotEmpty", "IsString", "IsIn"], "Residential, Commercial"))

      assertCreateIsInvalid([{ building_type: "" }], messageErrors("building_type", ["IsNotEmpty", "IsIn"], "Residential, Commercial"))

      invalidValues = formatPropertyValues("building_type", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("building_type", ["IsString", "IsIn"], "Residential, Commercial"))

      assertCreateIsInvalid([{ building_type: "test" }], messageErrors("building_type", ["IsIn"], "Residential, Commercial"))
    })

    it("should be invalid Build by its energy_company_id", () => {
      let invalidValues: any[] = formatPropertyValues("energy_company_id", [null, undefined, ""])
      assertCreateIsInvalid(invalidValues, messageErrors("energy_company_id", ["IsNotEmpty", "IsInstance"]))

      invalidValues = formatPropertyValues("energy_company_id", [1, true, false, {}, []])
      assertCreateIsInvalid(invalidValues, messageErrors("energy_company_id", ["IsInstance"]))
    })

    it("should be invalid Build by its created_at", () => {
      let invalidValues: any[] = formatPropertyValues("created_at", ["", true, false, 1])
      assertCreateIsInvalid(invalidValues, messageErrors("created_at", ["IsDate"]))
    })

    it("should be a valid Build", () => {
      expect(() => new Build(
        {
          name: "Build project",
          model: "FMAX",
          building_type: "Residential",
          energy_company_id: new UniqueEntityId()
        })).not.toThrow(EntityValidationError)
    })
  })

  describe("update method", () => {
    const energyCompanyId = new UniqueEntityId()
    const props: BuildProperties = {
      name: "Build project",
      model: "FMAX",
      building_type: "Residential",
      energy_company_id: energyCompanyId
    }
    const build = new Build(props)

    it("should be invalid Build by its name", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(invalidValue, props.model, props.building_type, props.energy_company_id))
          .containsErrorMessages(messageErrors("name", ["IsNotEmpty", "IsString"]))
      })

      expect(() =>
        build.update("", props.model, props.building_type, props.energy_company_id))
        .containsErrorMessages(messageErrors("name", ["IsNotEmpty"]))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(invalidValue, props.model, props.building_type, props.energy_company_id))
          .containsErrorMessages(messageErrors("name", ["IsString"]))
      })
    });

    it("should be invalid Build by its model property", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(props.name, invalidValue, props.building_type, props.energy_company_id))
          .containsErrorMessages(messageErrors("model", ["IsNotEmpty", "IsString", "IsIn"], "CMAX, FMAX"))
      })

      expect(() =>
        build.update(props.name, "" as any, props.building_type, props.energy_company_id))
        .containsErrorMessages(messageErrors("model", ["IsNotEmpty", "IsIn"], "CMAX, FMAX"))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(props.name, invalidValue, props.building_type, props.energy_company_id))
          .containsErrorMessages(messageErrors("model", ["IsString", "IsIn"], "CMAX, FMAX"))
      })

      expect(() =>
        build.update(props.name, "test" as any, props.building_type, props.energy_company_id))
        .containsErrorMessages(messageErrors("model", ["IsIn"], "CMAX, FMAX"))
    })

    it("should be invalid Build by its building_type", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(props.name, props.model, invalidValue, props.energy_company_id))
          .containsErrorMessages(messageErrors("building_type", ["IsNotEmpty", "IsString", "IsIn"], "Residential, Commercial"))
      })

      expect(() =>
        build.update(props.name, props.model, "" as any, props.energy_company_id))
        .containsErrorMessages(messageErrors("building_type", ["IsNotEmpty", "IsIn"], "Residential, Commercial"))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          build.update(props.name, props.model, invalidValue, props.energy_company_id))
          .containsErrorMessages(messageErrors("building_type", ["IsString", "IsIn"], "Residential, Commercial"))
      })

      expect(() =>
        build.update(props.name, props.model, "test" as any, props.energy_company_id))
        .containsErrorMessages(messageErrors("building_type", ["IsIn"], "Residential, Commercial"))
    })

    it("should be invalid Build by its energy_company_id", () => {
      let invalidValues: any[] = [null, undefined, ""]
      invalidValues.forEach(invalidValue => {
        expect(() =>
          build.update(props.name, props.model, props.building_type, invalidValue))
          .containsErrorMessages(messageErrors("energy_company_id", ["IsNotEmpty", "IsInstance"], "Residential, Commercial"))
      })

      invalidValues = [1, true, false, {}, [], "teste"]
      invalidValues.forEach(invalidValue => {
        expect(() =>
          build.update(props.name, props.model, props.building_type, invalidValue))
          .containsErrorMessages(messageErrors("energy_company_id", ["IsInstance"], "Residential, Commercial"))
      })
    })

    it("should be a valid Build", () => {
      expect.assertions(0)
      build.update("New Build name", "CMAX", "Commercial", new UniqueEntityId())
    })
  })
})
