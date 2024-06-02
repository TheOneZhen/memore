import { onScopeDispose } from 'vue'
export interface Fn {
  (): void
}

const events = new Map<symbol, Set<Fn>>()

function on(key: symbol, listener: Fn) {
  const listeners = events.get(key) || new Set()
  listeners.add(listener)
  events.set(key, listeners)

  const _off = () => off(key, listener)

  onScopeDispose(_off)

  return _off
}

function once(key: symbol, listener: Fn) {
  const newListener = (...args: any[]) => {
    // @ts-expect-error cast
    listener(...args)
    off(key, listener)
  }

  on(key, newListener)
}

function off(key: symbol, listener: Fn) {
  const listeners = events.get(key)

  if (listeners === undefined) return

  listeners.delete(listener)
}

function emit(key: symbol, ...data: any) {
  const listeners = events.get(key)

  if (listeners === undefined || listeners.size === 0) return
  // @ts-expect-error cast
  for (const fn of listeners) fn(...data)
}

function clear(key: symbol) {
  events.delete(key)
}

function clearAll() {
  events.clear()
}

export default { on, once, off, emit, clear, clearAll }
