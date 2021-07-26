import { useState, useEffect } from 'react'
import {
  AnyStateNodeDefinition,
  AnyEventObject,
  StateMachine,
  State,
  Sender,
  EventObject,
  StateConfig
} from 'xstate'
import { useMachine } from '@xstate/react'
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

export function usePersistedMachine<
  TContext = any,
  TStateSchema extends AnyStateNodeDefinition = AnyStateNodeDefinition,
  TEvents extends EventObject = AnyEventObject
>(
  machine: StateMachine<TContext, TStateSchema, TEvents>,
  key: string,
  instance?: number | string
): [State<TContext, TEvents>, Sender<TEvents>, () => void] {
  // Attempt to get stored state config from localstorage
  const config_string = localStorage.getItem(`${key}:${instance}`)
  let config: StateConfig<TContext, TEvents> | undefined = undefined
  try {
    if (config_string) {
      config = JSON.parse(config_string) as StateConfig<TContext, TEvents>
    }
  } catch (e) {
    console.error(e.message)
  }

  // Create Machine and Pass Fetched State Config to be rehydrated.
  const [state, send] = useMachine(machine, {
    state: config?.done ? undefined : config
  })

  // Effect: On State Change, Freeze and store current state as state_config_string
  useEffect(() => {
    localStorage.setItem(`${key}:${instance}`, JSON.stringify(state))
  }, [state])

  return [
    state,
    send,
    () => {
      localStorage.removeItem(`${key}:${instance}`)
    }
  ]
}
