import UniqueEntityId from "../../../@shared/domain/value-objects/unique-entity-id.vo";
import { Section, SectionProperties } from "./section"

describe("Section Unit Tests", () => {
  const buildId = new UniqueEntityId();
  const props = {
    order: 1,
    from: 'test 1',
    to: 'test 2',
    distance: 10,
    current: 20,
    thermic_current: 30,
    build_id: buildId
  }
  const section = new Section(props);

  // beforeEach(() => {
  //   Section.validate = jest.fn();
  // })

  test("Constructor of Section", () => {
    // expect(Section.validate).toHaveBeenCalledTimes(1);
    expect(section.props).toStrictEqual({
      order: 1,
      from: 'test 1',
      to: 'test 2',
      distance: 10,
      current: 20,
      thermic_current: 30,
      build_id: buildId
    })
  })

  test("id field", () => {
    const sectionDatas: { id?: any; props: SectionProperties }[] = [
      { props },
      { props, id: undefined },
      { props, id: null },
      { props, id: "" },
      { props, id: new UniqueEntityId() },
    ];
    sectionDatas.forEach((sectionData) => {
      const section = new Section(sectionData.props, sectionData.id);
      expect(section.id).not.toBeFalsy();
      expect(section.uniqueEntityId).not.toBeFalsy();
      expect(typeof section.id).toBe('string');
      expect(section.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test("getter and setter of each non optional prop", () => {
    expect(section.order).toBe(1);
    section['order'] = 2
    expect(section.order).toBe(2)

    expect(section.from).toBe("test 1");
    section['from'] = "CMAX"
    expect(section.from).toBe("CMAX")

    expect(section.to).toBe("test 2");
    section['to'] = "New section to"
    expect(section.to).toBe("New section to")

    expect(section.distance).toBe(10);
    section['distance'] = 40
    expect(section.distance).toBe(40)

    expect(section.current).toBe(20);
    section['current'] = 50
    expect(section.current).toBe(50)

    expect(section.thermic_current).toBe(30);
    section['thermic_current'] = 60
    expect(section.thermic_current).toBe(60)

    expect(section.build_id).toBe(buildId);
  });
})