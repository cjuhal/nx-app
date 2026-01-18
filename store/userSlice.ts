import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string;
    email: string;
    age: number;
    picture: string | null;
}

const userInitialState: User = {
    name: 'Christian Juhal',
    email: 'chrisjuhal@gmail.com',
    age: 32,
    picture: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        removePicture: (state) => { state.picture = '' },
        setPicture: (state, action: PayloadAction<string>) => { state.picture = action.payload; }
    },
})


export const { removePicture, setPicture } = userSlice.actions;
export default userSlice.reducer;
