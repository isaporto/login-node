import Entity from "../../../@shared/domain/entities/entity";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { EnergyCompany, EnergyCompanyProperties } from "./energy-company";

describe("EnergyCompany Unit Tests", () => {
  const props: EnergyCompanyProperties = {
    name: "Eletropaulo",
    nominal_voltage: 1,
    residential_percent: 2,
    commercial_percent: 3
  }
  let spyValidate: jest.SpyInstance;
  let energyCompany: EnergyCompany;

  beforeEach(() => {
    spyValidate = jest.spyOn(EnergyCompany.prototype as any, 'validate');
    spyValidate.mockImplementation(() => { });
    energyCompany = new EnergyCompany({ props });
  })

  test("Constructor of EnergyCompany", () => {
    expect(spyValidate).toHaveBeenCalledTimes(1);
    expect(energyCompany["props"]).toStrictEqual({
      name: "Eletropaulo",
      nominal_voltage: 1,
      residential_percent: 2,
      commercial_percent: 3
    });
    expect(energyCompany.createdAt).toBeInstanceOf(Date);
    expect(energyCompany.updatedAt).toBeInstanceOf(Date);
    expect(energyCompany.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(energyCompany).toBeInstanceOf(Entity)
  });

  test("getter and setter of each non optional prop", () => {
    expect(energyCompany.name).toBe("Eletropaulo");
    energyCompany['name'] = "Enel"
    expect(energyCompany.name).toBe("Enel")

    expect(energyCompany.nominal_voltage).toBe(1);
    energyCompany['nominal_voltage'] = 4
    expect(energyCompany.nominal_voltage).toBe(4)

    expect(energyCompany.residential_percent).toBe(2);
    energyCompany['residential_percent'] = 5
    expect(energyCompany.residential_percent).toBe(5)

    expect(energyCompany.commercial_percent).toBe(3);
    energyCompany['commercial_percent'] = 6
    expect(energyCompany.commercial_percent).toBe(6)
  });

  it("should update energyCompany", () => {
    energyCompany.update("Enel", 4, 5, 6);
    expect(spyValidate).toHaveBeenCalledTimes(2);
    expect(energyCompany.name).toBe("Enel");
    expect(energyCompany.nominal_voltage).toBe(4);
    expect(energyCompany.residential_percent).toBe(5);
    expect(energyCompany.commercial_percent).toBe(6);
  })
});
