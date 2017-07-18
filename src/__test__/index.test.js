import R from '..';

test('startsWith works with array', () => {
  expect(R.startsWith(['1', 2], ['1', 2, '3'])).toBe(true);
});

test('startsWith works with array 2', () => {
  expect(R.startsWith(['1', 3], ['1', 2, '3'])).toBe(false);
});

test('startsWith works with strings', () =>
  expect(R.startsWith('12', '123')).toBe(true));

test('startsWith works with strings 2', () => {
  expect(R.startsWith('13', '123')).toBe(false);
});
