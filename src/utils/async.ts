export const delay = <T>(amount: number, resolvedValue?: T) =>
  new Promise<T>((resolve) =>
    setTimeout(() => resolve(resolvedValue as T), amount)
  );
