import { proxy } from 'valtio';

function createState<T extends object>(initialState: new () => T): InstanceType<typeof initialState>;
function createState<T extends object>(initialState?: T): T;
function createState<T extends object>(initialState?: T | (new () => T)) {
  // 实现签名
  if (typeof initialState === 'function') {
    const instance = new (initialState as new () => T)();
    return proxy(instance);
  }
  return proxy(initialState || ({} as T));
}

export default createState;
