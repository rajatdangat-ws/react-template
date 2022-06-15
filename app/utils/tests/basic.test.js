const squareNo = (no) => {
  if (no === null || no === undefined) {
    return 0;
  }
  const value = Number(no);
  if (isNaN(value)) {
    throw new Error('should be a valid number');
  }
  return value * value;
};

describe('test squareNo function', () => {
  it('should return valid output', () => {
    expect(squareNo(4)).toBe(16);
  });

  it('should return 0 if value is null or undefined', () => {
    expect(squareNo(null)).toBe(0);
  });

  it('should parse string to integer', () => {
    expect(squareNo('4')).toBe(16);
  });

  it('should throw an error if not a valid number', () => {
    expect(() => squareNo('a')).toThrow('should be a valid number');
  });
});
