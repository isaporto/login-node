import { EnergyCompany, EnergyCompanyProperties } from "./energy-company";
import { FieldsErrors } from "../../../@shared/domain/validators/validator-fields-interface";
import EntityValidationError from "../../../@shared/domain/errors/validation.error";

describe("EnergyCompany Integration Tests", () => {
  function messageErrors(field: string, errors: string[]) {
    const messages: string[] = [];
    errors.forEach(error => {
      if (error === "IsString") messages.push(`${field} must be a string`)
      if (error === "IsNotEmpty") messages.push(`${field} should not be empty`)
      if (error === "IsNumber") messages.push(`${field} must be a number conforming to the specified constraints`)
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
      expect(() => new EnergyCompany(invalidValue)).containsErrorMessages(errors);
    });
  }

  describe("create method", () => {
    it("should be invalid EnergyCompany by its name", () => {
      let invalidValues: any[] = formatPropertyValues("name", [null, undefined])
      assertCreateIsInvalid(invalidValues, messageErrors("name", ["IsNotEmpty", "IsString"]));

      assertCreateIsInvalid([{ name: "" }], messageErrors("name", ["IsNotEmpty"]));

      invalidValues = formatPropertyValues("name", [1, true, false, [], {}])
      assertCreateIsInvalid(invalidValues, messageErrors("name", ["IsString"]));
    });

    it("should be invalid EnergyCompany by its nominal_voltage property", () => {
      let invalidValues: any[] = formatPropertyValues("nominal_voltage", [null, undefined, ""])
      assertCreateIsInvalid(invalidValues, messageErrors("nominal_voltage", ["IsNotEmpty", "IsNumber"]))

      invalidValues = formatPropertyValues("nominal_voltage", [true, false, [], {}, "test"])
      assertCreateIsInvalid(invalidValues, messageErrors("nominal_voltage", ["IsNumber"]))
    })

    it("should be invalid EnergyCompany by its residential_percent property", () => {
      let invalidValues: any[] = formatPropertyValues("residential_percent", [null, undefined, ""])
      assertCreateIsInvalid(invalidValues, messageErrors("residential_percent", ["IsNotEmpty", "IsNumber"]))

      invalidValues = formatPropertyValues("residential_percent", [true, false, [], {}, "test"])
      assertCreateIsInvalid(invalidValues, messageErrors("residential_percent", ["IsNumber"]))
    })

    it("should be invalid EnergyCompany by its commercial_percent property", () => {
      let invalidValues: any[] = formatPropertyValues("commercial_percent", [null, undefined, ""])
      assertCreateIsInvalid(invalidValues, messageErrors("commercial_percent", ["IsNotEmpty", "IsNumber"]))

      invalidValues = formatPropertyValues("commercial_percent", [true, false, [], {}, "test"])
      assertCreateIsInvalid(invalidValues, messageErrors("commercial_percent", ["IsNumber"]))
    })

    it("should be a valid EnergyCompany", () => {
      expect(() => new EnergyCompany(
        {
          name: "Eletropaulo",
          nominal_voltage: 1,
          residential_percent: 2,
          commercial_percent: 3
        })).not.toThrow(EntityValidationError)
    })
  })

  describe("update method", () => {
    const props: EnergyCompanyProperties = {
      name: "Eletropaulo",
      nominal_voltage: 1,
      residential_percent: 2,
      commercial_percent: 3
    }
    const energyCompany = new EnergyCompany(props)

    it("should be invalid EnergyCompany by its name", () => {
      let invalidValues: any[] = [null, undefined]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(invalidValue, props.nominal_voltage, props.residential_percent, props.commercial_percent))
          .containsErrorMessages(messageErrors("name", ["IsNotEmpty", "IsString"]))
      })

      expect(() =>
        energyCompany.update("", props.nominal_voltage, props.residential_percent, props.commercial_percent))
        .containsErrorMessages(messageErrors("name", ["IsNotEmpty"]))

      invalidValues = [1, true, false, [], {}]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(invalidValue, props.nominal_voltage, props.residential_percent, props.commercial_percent))
          .containsErrorMessages(messageErrors("name", ["IsString"]))
      })
    });

    it("should be invalid EnergyCompany by its nominal_voltage property", () => {
      let invalidValues: any[] = [null, undefined, ""]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, invalidValue, props.residential_percent, props.commercial_percent))
          .containsErrorMessages(messageErrors("nominal_voltage", ["IsNotEmpty", "IsNumber"]))
      })

      invalidValues = [true, false, [], {}, "test"]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, invalidValue, props.residential_percent, props.commercial_percent))
          .containsErrorMessages(messageErrors("nominal_voltage", ["IsNumber"]))
      })
    })

    it("should be invalid EnergyCompany by its residential_percent property", () => {
      let invalidValues: any[] = [null, undefined, ""]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, props.nominal_voltage, invalidValue, props.commercial_percent))
          .containsErrorMessages(messageErrors("residential_percent", ["IsNotEmpty", "IsNumber"]))
      })

      invalidValues = [true, false, [], {}, "test"]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, props.nominal_voltage, invalidValue, props.commercial_percent))
          .containsErrorMessages(messageErrors("residential_percent", ["IsNumber"]))
      })
    })

    it("should be invalid EnergyCompany by its commercial_percent property", () => {
      let invalidValues: any[] = [null, undefined, ""]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, props.nominal_voltage, props.residential_percent, invalidValue))
          .containsErrorMessages(messageErrors("commercial_percent", ["IsNotEmpty", "IsNumber"]))
      })

      invalidValues = [true, false, [], {}, "test"]
      invalidValues.forEach((invalidValue) => {
        expect(() =>
          energyCompany.update(props.name, props.nominal_voltage, props.residential_percent, invalidValue))
          .containsErrorMessages(messageErrors("commercial_percent", ["IsNumber"]))
      })
    })

    it("should be a valid EnergyCompany", () => {
      expect.assertions(0)
      energyCompany.update("Enel", 4, 5, 6)
    })
  })
})
