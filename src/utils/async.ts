export const delay = <T>(amount: number, resolvedValue?: T) =>
  new Promise<T>((resolve) =>
    setTimeout(() => resolve(resolvedValue as T), amount)
  );

export const delayError = <T>(amount: number, error: Error) =>
  new Promise<T>((_, reject) => setTimeout(() => reject(error), amount));
