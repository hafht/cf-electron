# TASK: IMPLEMENT DISPOSABLE PATTERN

This task introduces the `Disposable` pattern (inspired by VS Code) into the `@creative-force/electron` framework to manage resource lifecycles and prevent memory leaks.

## 🎯 Objective
1.  Create a `Disposable` base class/mixin.
2.  Update `ElectronModule` interface to support disposal.
3.  Refactor existing modules to inherit/use `Disposable`.

## 🛠 Step-by-Step Instructions

### Step 1: Create Disposable Base
Create file `packages/core/src/common/lifecycle.ts`:

```typescript
export interface IDisposable {
  dispose(): void;
}

export class Disposable implements IDisposable {
  private readonly _store: IDisposable[] = [];
  protected _isDisposed = false;

  constructor() {
    // track creation if needed
  }

  public dispose(): void {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    this._store.forEach(d => d.dispose());
    this._store.length = 0;
  }

  protected _register<T extends IDisposable>(t: T): T {
    if (this._isDisposed) {
      t.dispose();
    } else {
      this._store.push(t);
    }
    return t;
  }
}

export function toDisposable(fn: () => void): IDisposable {
  return { dispose: fn };
}