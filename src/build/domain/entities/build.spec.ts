import { Build, BuildProperties } from "./build";
import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";

describe("Build Unit Tests", () => {
  const energyCompanyId = new UniqueEntityId()
  const props: BuildProperties = {
    name: "Build project",
    model: "FMAX",
    building_type: "Residential",
    energy_company_id: energyCompanyId
  }

  beforeEach(() => {
    Build.validate = jest.fn();
  })

  test("Constructor of Build", () => {
    let build = new Build(props);
    const propsDateOmitted = omit(build.props, "created_at");

    expect(Build.validate).toHaveBeenCalledTimes(1);
    expect(propsDateOmitted).toStrictEqual({
      name: "Build project",
      model: "FMAX",
      building_type: "Residential",
      energy_company_id: energyCompanyId
    });
    expect(build.props.created_at).toBeInstanceOf(Date);
  });

  test("id field", () => {
    const buildDatas: { id?: any; props: BuildProperties }[] = [
      { props },
      { props, id: undefined },
      { props, id: null },
      { props, id: "" },
      { props, id: new UniqueEntityId() },
    ];
    buildDatas.forEach((buildData) => {
      const build = new Build(buildData.props, buildData.id);
      expect(build.id).not.toBeFalsy();
      expect(build.uniqueEntityId).not.toBeFalsy();
      expect(typeof build.id).toBe('string');
      expect(build.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of each non optional prop", () => {
    const newEnergyCompanyId = new UniqueEntityId()

    const build = new Build(props);
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

  test("getter of created_at prop", () => {
    const created_at = new Date("12/12/2012");
    let build = new Build({
      ...props,
      created_at,
    });
    expect(build.created_at).toBe(created_at);

    build = new Build(props);
    expect(build.created_at).toBeInstanceOf(Date);
  });
});
