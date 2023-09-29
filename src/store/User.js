import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    token: null,
    userName: null
};

export const userAuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
            state.userName = action.payload.userName;
        },
        setLogout: (state) => {
            state.userId = null;
            state.token = null;
            state.userName = null;
        },
    },
});

export const { setLogin, setLogout } = userAuthSlice.actions;
export default userAuthSlice.reducer;