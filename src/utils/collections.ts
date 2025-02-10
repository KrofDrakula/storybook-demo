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
