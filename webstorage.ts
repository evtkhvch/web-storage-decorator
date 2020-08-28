export enum StorageType {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage'
}

export const WebStorage = (nameStorage: StorageType = StorageType.localStorage): (target: unknown, propertyKey: string) => void => {
  return (target: unknown, propertyKey: string): void => {
    Object.defineProperty(target, propertyKey, {
      get: () => JSON.parse(window[nameStorage].getItem(propertyKey)) || '',
      set: (newValue: string) => {
        try {
          window[nameStorage].setItem(propertyKey, JSON.stringify(newValue));
        } catch (e) {
          console.error(e);
        }
      },
      enumerable: true,
      configurable: true
    });
  };
};
