/**
 * Interface for objects that can be disposed to clean up resources.
 * Inspired by VS Code's disposable pattern to manage resource lifecycles and prevent memory leaks.
 */
export interface IDisposable {
  /**
   * Dispose of resources held by this object.
   * After disposal, the object should not be used anymore.
   */
  dispose(): void;
}

/**
 * Base class for managing disposable resources.
 * Provides automatic cleanup of registered disposables when disposed.
 * 
 * @example
 * ```ts
 * class MyModule extends Disposable {
 *   constructor() {
 *     super();
 *     const resource = new SomeResource();
 *     this._register(resource); // Automatically disposed when module is disposed
 *   }
 * }
 * ```
 */
export class Disposable implements IDisposable {
  private readonly _store: IDisposable[] = [];
  protected _isDisposed = false;

  constructor() {
    // track creation if needed
  }

  /**
   * Dispose of all registered resources.
   * Safe to call multiple times - will only dispose once.
   */
  public dispose(): void {
    if (this._isDisposed) {
      return;
    }
    this._isDisposed = true;
    this._store.forEach(d => d.dispose());
    this._store.length = 0;
  }

  /**
   * Register a disposable resource to be disposed when this object is disposed.
   * If this object is already disposed, the resource will be disposed immediately.
   * 
   * @param t - The disposable resource to register
   * @returns The same disposable resource for chaining
   */
  protected _register<T extends IDisposable>(t: T): T {
    if (this._isDisposed) {
      t.dispose();
    } else {
      this._store.push(t);
    }
    return t;
  }
}

/**
 * Create a disposable from a cleanup function.
 * Useful for wrapping cleanup logic in a disposable.
 * 
 * @param fn - Cleanup function to call when disposed
 * @returns A disposable object that calls the function when disposed
 * 
 * @example
 * ```ts
 * const disposable = toDisposable(() => {
 *   console.log('Cleaning up');
 * });
 * disposable.dispose(); // Logs "Cleaning up"
 * ```
 */
export function toDisposable(fn: () => void): IDisposable {
  return { dispose: fn };
}
