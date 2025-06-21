import fn from '../src';

describe('Normal test cases', () => {
  it('should create a state from a class', () => {
    class Counter {
      public count = 1;

      get doubled() {
        return this.count * 2;
      }

      set doubled(newValue: number) {
        this.count = newValue / 2;
      }
    }

    const state = fn(Counter);
    expect(state.count).toBe(1);
    expect(state.doubled).toBe(2);

    state.count++;
    expect(state.count).toBe(2);
    expect(state.doubled).toBe(4);

    state.doubled = 10;
    expect(state.count).toBe(5);
    expect(state.doubled).toBe(10);
  });

  it('should create a state from an object', () => {
    const state = fn({
      count: 1,
      get doubled() {
        return this.count * 2;
      },
      set doubled(newValue: number) {
        this.count = newValue / 2;
      }
    });

    expect(state.count).toBe(1);
    expect(state.doubled).toBe(2);

    state.count++;
    expect(state.count).toBe(2);
    expect(state.doubled).toBe(4);

    state.doubled = 10;
    expect(state.count).toBe(5);
    expect(state.doubled).toBe(10);
  });

  it('should create an empty state if no initial state is provided', () => {
    const state = fn();
    expect(state).toEqual({});
  });
});
