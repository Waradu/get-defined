const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function def<T extends object>(constructor: { new (): T }): DefinedClass<T> {
  const refClass = new constructor();

  const defineAccessor = (key: keyof T, type: 'get' | 'set') => {
    const methodName = `${type}${capitalizeFirstLetter(key as string)}` as keyof DefinedClass<T>;
    Object.defineProperty(refClass, methodName, {
      value: type === 'get'
        ? () => refClass[key]
        : (val: T[keyof T]) => { refClass[key] = val; },
      writable: true,
      enumerable: true,
      configurable: true
    });
  };

  for (const key of Object.keys(refClass) as Array<keyof T>) {
    defineAccessor(key, 'get');
    defineAccessor(key, 'set');
  }

  return refClass as DefinedClass<T>;
}

export function undef<T extends object>(instance: T): UndefinedClass<T> {
  const proto = Object.getPrototypeOf(instance);

  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key.startsWith('get') || key.startsWith('set')) {
      delete proto[key as keyof T];
    }
  }

  return proto as UndefinedClass<T>;
}

type DefinedClass<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
} & {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UndefinedClass<T> = {
  [K in keyof T as K extends `get${string}` | `set${string}` ? never : K]: T[K];
};