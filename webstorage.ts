export enum StorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage'
}

const errorLogger = (e: unknown): void => { console.error(e) };

const WINDOW_REF = window;

export const WebStorage = <T>(nameStorage: StorageType = StorageType.localStorage): (target: T, propertyKey: string) => void => {
  return (target: T, propertyKey: string): void => {
    Object.defineProperty(target, propertyKey, {
      get: (): T | null => JSON.parse(WINDOW_REF[nameStorage].getItem(propertyKey)) || null,
      set: (value: T) => {
        try {
          WINDOW_REF[nameStorage].setItem(propertyKey, JSON.stringify(value));
        } catch (e) {
          errorLogger(e);
        }
      },
      enumerable: true,
      configurable: true
    });
  };
};
