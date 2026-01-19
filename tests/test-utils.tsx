import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit' // 👈 Importamos combineReducers
import { Provider } from 'react-redux'

import type { RootState } from '@/store/store'
import counterReducer from '@/store/counterSlice'
import userReducer from '@/store/userSlice'

// 1. Creamos el rootReducer fuera para que el tipo sea consistente
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
})

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: ReturnType<typeof setupStore> // Usamos una función auxiliar para el tipo
}

// 2. Función para crear un store fresco
export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState), // 👈 Usamos la función auxiliar
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}