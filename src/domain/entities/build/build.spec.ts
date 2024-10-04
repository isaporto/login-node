import { Build, BuildProperties } from "./build";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@shared/domain/entities/entity";

describe("Build Unit Tests", () => {
  const energyCompanyId = new UniqueEntityId()
  const props: BuildProperties = {
    name: "Build project",
    model: "FMAX",
    building_type: "Residential",
    energy_company_id: energyCompanyId
  }
  let spyValidate: jest.SpyInstance;
  let build: Build;

  beforeEach(() => {
    spyValidate = jest.spyOn(Build.prototype as any, 'validate');
    spyValidate.mockImplementation(() => { });
    build = new Build({ props });
  })

  test("Constructor of Build", () => {
    expect(spyValidate).toHaveBeenCalledTimes(1);
    expect(build["props"]).toStrictEqual({
      name: "Build project",
      model: "FMAX",
      building_type: "Residential",
      energy_company_id: energyCompanyId
    });
    expect(build.createdAt).toBeInstanceOf(Date);
    expect(build.updatedAt).toBeInstanceOf(Date);
    expect(build.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(build).toBeInstanceOf(Entity)
  });

  test("getter and setter of each non optional prop", () => {
    const newEnergyCompanyId = new UniqueEntityId()

    const build = new Build({ props });
    expect(build.name).toBe("Build project");
    build['name'] = "New build name"
    expect(build.name).toBe("New build name")

    expect(build.model).toBe("FMAX");
    build['model'] = "CMAX"
    expect(build.model).toBe("CMAX")

    expect(build.building_type).toBe("Residential");
    build['building_type'] = "Commercial"
    expect(build.building_type).toBe("Commercial")

    expect(build.energy_company_id).toBe(energyCompanyId);
    build['energy_company_id'] = newEnergyCompanyId
    expect(build.energy_company_id).toBe(newEnergyCompanyId)
  });
});
