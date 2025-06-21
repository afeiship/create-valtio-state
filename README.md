# create-valtio-state
> Create valtio state.

## installation
```sh
yarn add @jswork/create-valtio-state
```

## usage
```js
import createState from '@jswork/create-valtio-state';

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

export { stateFromClass, stateFromObject };
```

## react
```tsx
import { HTMLAttributes, FC, useEffect } from 'react';
import cx from 'classnames';
import { subscribe, useSnapshot } from 'valtio';

type IProps = HTMLAttributes<HTMLDivElement>;

import { stateFromClass as state } from '@/stores/counter';

const Anonymous: FC<IProps> = (props) => {
  const { className, ...rest } = props;
  const snap = useSnapshot(state);

  useEffect(() => {
    return subscribe(state, () => {
      console.log('State changed:', state);
    });
  }, []);

  return (
    <div className={cx('y-4 relative', className)} {...rest}>
      <div className="bg-gray-100 p-4">Count: {snap.count}</div>
      <div className="bg-gray-100 p-4">Double: {snap.doubled}</div>
      <nav className="actions x-5 fcc">
        <button onClick={() => (state.count = 0)}>Reset</button>
        <button onClick={() => state.count++}>Increment</button>
        <button onClick={() => state.count--}>Decrement</button>
      </nav>
    </div>
  );
};

export default Anonymous;
```