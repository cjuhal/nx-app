import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import counterReducer from '../store/counterSlice'
import userReducer from '../store/userSlice'
import type { RootState } from '../store/store'

// Definimos una interfaz para las opciones del render que incluye un estado inicial opcional
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: any
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Creamos un store real con nuestros reducers
    store = configureStore({
      reducer: { counter: counterReducer, user: userReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Devolvemos el objeto de renderizado de RTL y el store por si queremos inspeccionarlo
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}