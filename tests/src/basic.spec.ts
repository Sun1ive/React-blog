const sum = (a: number, b: number): number => a + b;

describe('this is simple test', () => {
  test('Testing sum function', () => {
    const res = sum(0, 0);

    expect(res).toBe(0);
  });

  test('Testing sum function', () => {
    const res = sum(3, 6);

    expect(res).toBe(9);
  });
});
