export enum StorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage'
}

const errorLogger = (e: unknown): void => {
  console.error(e);
};

export const WebStorage = <T>(
    nameStorage: StorageType = StorageType.localStorage,
    platform: Window = window
): ((target: T, propertyKey: string) => void) => {
  return (target: T, propertyKey: string): void => {
    Object.defineProperty(target, propertyKey, {
      get: (): T | null => JSON.parse(platform[nameStorage].getItem(propertyKey)) || null,
      set: (value: T) => {
        try {
          platform[nameStorage].setItem(propertyKey, JSON.stringify(value));
        } catch (e) {
          errorLogger(e);
        }
      },
      enumerable: true,
      configurable: true
    });
  };
};
