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

export function* chunk<T>(
  iterable: Iterable<T>,
  count: number
): Generator<T[]> {
  let chunk: T[] = [];
  for (const item of iterable) {
    chunk.push(item);
    if (chunk.length == count) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length) yield chunk;
}
