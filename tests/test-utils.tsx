import React, { JSX, PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore, combineReducers } from '@reduxjs/toolkit' // 👈 Importamos combineReducers
import { Provider } from 'react-redux'

import type { RootState } from '@/store/store'
import counterReducer from '@/store/counterSlice'
import userReducer from '@/store/userSlice'
import rickAndMortyReducer from '@/store/rickAndMortySlice'

// 1. Creamos el rootReducer fuera para que el tipo sea consistente
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  rickAndMorty: rickAndMortyReducer,
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
  // Aseguramos que el modal-root exista en el DOM de JSDOM
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  }
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}