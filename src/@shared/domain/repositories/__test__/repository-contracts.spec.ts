import { SearchParams, SearchResult } from "../repository-contracts"

describe("SearchParams Unit Tests", () => {
  function assertPropSameExpected(
    property: keyof SearchParams,
    receivedValues: any[],
    expected: any
  ) {
    receivedValues.forEach(received => {
      expect(new SearchParams({ [property]: received })[property]).toBe(expected);
    })
  }

  test("page property", () => {
    let params = new SearchParams()
    expect(params.page).toBe(1);

    const wrongValues = [null, undefined, "", "fake", 0, -1, 5.5, true, false, {}, 1]
    assertPropSameExpected('page', wrongValues, 1);

    params = new SearchParams({ page: 2 })
    expect(params.page).toBe(2);
  })

  test("per_page property", () => {
    let params = new SearchParams()
    expect(params.per_page).toBe(10);

    const wrongValues = [null, undefined, "", "fake", 0, -1, 5.5, true, false, {}]
    assertPropSameExpected('per_page', wrongValues, 10);

    [2, 10, 15]. forEach(validValue => {
      params = new SearchParams({ per_page: validValue })
      expect(params.per_page).toBe(validValue);
    })
  })

  test("sort property", () => {
    let params = new SearchParams();
    expect(params.sort).toBeNull();

    const wrongValues = [null, undefined, ""];
    assertPropSameExpected('sort', wrongValues, null);

    const arrange: { received: any, expected: string }[] = [
      { received: "test", expected: 'test' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: {}, expected: '[object Object]' },
      { received: [], expected: '' },
    ]
    arrange.forEach(i => {
      params = new SearchParams({ sort: i.received })
      expect(params.sort).toBe(i.expected);
    })
  })

  test("sort_dir property", () => {
    let params = new SearchParams();
    expect(params.sort_dir).toBeNull();
    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBeNull();
    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBeNull();
    params = new SearchParams({ sort: "" });
    expect(params.sort_dir).toBeNull();

    const wrongValues = [null, undefined, "", 0, 1, [], {}, "test", true, false];
    wrongValues.forEach((wrongValue: any) => {
      params = new SearchParams({ sort: "propertyName", sort_dir: wrongValue });
      expect(params.sort_dir).toBe("asc");
    })

    const arrange: { received: any, expected: string }[] = [
      { received: "asc", expected: 'asc' },
      { received: "ASC", expected: 'asc' },
      { received: "desc", expected: 'desc' },
      { received: "DESC", expected: 'desc' },
    ]
    arrange.forEach(i => {
      params = new SearchParams({ sort: "propertyName", sort_dir: i.received })
      expect(params.sort_dir).toBe(i.expected);
    })
  })

  test("filter property", () => {
    let params = new SearchParams();
    expect(params.filter).toBeNull();

    const wrongValues = [null, undefined, ""];
    assertPropSameExpected('filter', wrongValues, null);

    const arrange: { received: any, expected: string }[] = [
      { received: "test", expected: 'test' },
      { received: 0, expected: '0' },
      { received: 1, expected: '1' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: {}, expected: '[object Object]' },
      { received: [], expected: '' },
    ]
    arrange.forEach(i => {
      params = new SearchParams({ filter: i.received })
      expect(params.filter).toBe(i.expected);
    })
  })
})

describe("SearchResult Unit Tests", () => {
  test("constructor props", () => {
    let result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_dir: null,
      filter: null
    })

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: null,
      sort_dir: null,
      filter: null
    })

    result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: "test"
    })

    expect(result.toJSON()).toStrictEqual({
      items: ['entity1', 'entity2'],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: "test"
    })
  })

  it('should set last_page 1 when per_page is greater than total field', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 10,
      sort: 'name',
      sort_dir: 'asc',
      filter: "test"
    })
    expect(result.last_page).toBe(1)
  })

  test('last_page prop when total is not multiple of per_page', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 15,
      current_page: 1,
      per_page: 2,
      sort: 'name',
      sort_dir: 'asc',
      filter: "test"
    })
    expect(result.last_page).toBe(8)
  })
})