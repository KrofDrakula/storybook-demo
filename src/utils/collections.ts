export const map = <U, V>(
  source: Iterable<U>,
  mapper: (item: U, index: number) => V
): V[] => {
  const result: V[] = [];
  let i = 0;
  for (const item of source) {
    result.push(mapper(item, i++));
  }
  return result;
};
