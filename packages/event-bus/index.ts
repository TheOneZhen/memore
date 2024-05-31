import { onScopeDispose } from 'vue'

export function EventBus() {
  const events = new Map<symbol, Set<Fn>>()

  function on(key: symbol, listener) {
    const listeners = events.get(key) || new Set()
    listeners.add(listener)
    events.set(key, listeners)

    const _off = () => off(key, listener)

    onScopeDispose(_off)

    return _off
  }
  function once() {}
  function off(key: symbol, listener) {}
  function emit() {}
  function clear() {}
  return {}
}
