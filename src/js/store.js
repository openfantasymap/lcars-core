// =============================================================================
//  LCARS · Reactive store
// -----------------------------------------------------------------------------
//  A tiny dependency-free observable key/value store. Feed it from anything
//  (MQTT, WebSocket, EventSource, polling…) by calling `set`, and any bound
//  DOM updates in real time. See bind.js.
// =============================================================================

export function createStore(initial = {}) {
  const state = { ...initial };
  const subs = new Set();

  function get(key) {
    return key == null ? { ...state } : state[key];
  }

  // set('k', v)  |  set({ k1: v1, k2: v2 })
  function set(key, value) {
    const changed = [];
    if (key !== null && typeof key === 'object') {
      for (const k in key) {
        if (!Object.is(state[k], key[k])) {
          state[k] = key[k];
          changed.push(k);
        }
      }
    } else if (!Object.is(state[key], value)) {
      state[key] = value;
      changed.push(key);
    }
    if (changed.length) {
      for (const fn of subs) fn(changed, state);
    }
    return changed;
  }

  function update(key, fn) {
    return set(key, fn(state[key], state));
  }

  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }

  return {
    get,
    set,
    update,
    subscribe,
    get state() {
      return { ...state };
    },
  };
}
