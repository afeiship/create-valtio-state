# create-valtio-state
> Create valtio state.

## installation
```sh
yarn add @jswork/create-valtio-state
```

## usage
```js
import createState from '@jswork/create-valtio-state';
import { proxy } from 'valtio';

// 示例 1：使用类
class Counter {
  public count = 1;

  get doubled() {
    return this.count * 2;
  }

  set doubled(newValue: number) {
    this.count = newValue / 2;
  }
}

const stateFromClass = createState(Counter);

// 示例 2：使用普通对象
const stateFromObject = createState({
  count: 1,
  get doubled() {
    return this.count * 2;
  },
  set doubled(newValue: number) {
    this.count = newValue / 2;
  }
});

export { stateFromClass, stateFromObject, Counter };
```