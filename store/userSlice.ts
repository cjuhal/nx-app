import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    phone: string;
    picture: string | null;
    company: UserCompany;
    website: string;
    username: string;
    address: UserAddress;
}

interface UserCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface UserAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo
}

interface Geo {
    lat: string;
    lng: string;
}

interface UserData {
    data: User | null;
    loading: boolean;
    error: string;
}

const userInitialState: UserData = { data: null, loading: false, error: '' }

// 1. Definimos la acción asíncrona
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return await response.json();
});


const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        removePicture: (state) => {
            if (state.data) {
                state.data.picture = null;
            }
        },
        setPicture: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.picture = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload; // Aquí guardamos lo que viene de la API
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false;
                state.error = "Error al cargar";
            });
    },
})


export const { removePicture, setPicture } = userSlice.actions;
export default userSlice.reducer;
