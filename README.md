## 😉 Web Storage Decortor 😉

```html
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
```

## How to use 🤭

```html
class ExampleClass {
    @WebStorage(StorageType.sessionStorage) public token: string;

    public exampleMethod(token: string): void {
        // **
        this.token = string; // set
    }

    public exmapleMethod2(): string {
        // **
        return this.token // get
    }
}
```

