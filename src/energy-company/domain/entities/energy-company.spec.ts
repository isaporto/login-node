import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { EnergyCompany, EnergyCompanyProperties } from "./energy-company";

describe("EnergyCompany Unit Tests", () => {
  const props: EnergyCompanyProperties = {
    name: "Eletropaulo",
    nominal_voltage: 1,
    residential_percent: 2,
    commercial_percent: 3
  }

  beforeEach(() => {
    EnergyCompany.validate = jest.fn();
  })

  test("Constructor of EnergyCompany", () => {
    let energyCompany = new EnergyCompany(props);

    expect(EnergyCompany.validate).toHaveBeenCalledTimes(1);
    expect(energyCompany.props).toStrictEqual({
      name: "Eletropaulo",
      nominal_voltage: 1,
      residential_percent: 2,
      commercial_percent: 3
    });
  });

  test("id field", () => {
    const energyCompanyDatas: { id?: any; props: EnergyCompanyProperties }[] = [
      { props },
      { props, id: undefined },
      { props, id: null },
      { props, id: "" },
      { props, id: new UniqueEntityId() },
    ];
    energyCompanyDatas.forEach((energyCompanyData) => {
      const energyCompany = new EnergyCompany(energyCompanyData.props, energyCompanyData.id);
      expect(energyCompany.id).not.toBeFalsy();
      expect(energyCompany.uniqueEntityId).not.toBeFalsy();
      expect(typeof energyCompany.id).toBe('string');
      expect(energyCompany.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of each non optional prop", () => {
    const energyCompany = new EnergyCompany(props);
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
});
