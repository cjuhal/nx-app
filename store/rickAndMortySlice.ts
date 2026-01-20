import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Char {
    name: string;
    status: string;
    species: string;
    image: string;
}

interface RickAndMortyData {
    data: Char | null;
    loading: boolean;
    error: string;
}

const initialStateRickAndMorty: RickAndMortyData = { data: null, loading: false, error: '' };

const rickSlice = createSlice({
    name: 'rickAndMorty',
    initialState: initialStateRickAndMorty,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRickAndMortyChar.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRickAndMortyChar.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Aquí guardamos lo que viene de la API
            })
            .addCase(fetchRickAndMortyChar.rejected, (state) => {
                state.loading = false;
                state.error = "Error al cargar";
            });
    },
})


export const fetchRickAndMortyChar = createAsyncThunk(
    'char/fetchById',
    async (id: number) => {
        const query = `
      query getChar($id: ID!) {
        character(id: $id) {
          name
          status
          species
          image
        }
      }
    `;

        const response = await fetch('https://rickandmortyapi.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: { id } // Pasamos el ID dinámicamente
            }),
        });

        const result = await response.json();
        return result.data.character; // GraphQL siempre devuelve un objeto "data"
    }
);

export default rickSlice.reducer;