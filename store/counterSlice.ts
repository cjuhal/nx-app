import { createSlice } from "@reduxjs/toolkit";

// Definimos el tipo de nuestro estado
interface CounterState {
  value: number;
}

// Estado inicial
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit nos permite "mutar" el estado de forma segura aquí
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// Exportamos las acciones para usarlas en los componentes
export const { increment, decrement } = counterSlice.actions;

// Exportamos el reducer para el store
export default counterSlice.reducer;