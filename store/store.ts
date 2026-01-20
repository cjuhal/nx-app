import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import rickAndMortyReducer from './rickAndMortySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    rickAndMorty: rickAndMortyReducer,
  },
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;