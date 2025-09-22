import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: "",
}

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:3500/login", {
            username: user.username,
            password: user.password,
        }, { withCredentials: true });

        // const { role } = response.data
        return response.data;
    } catch (error) {
        const message = error.response.data.msg
        return thunkAPI.rejectWithValue(message);
    }
});

export const GetMe = createAsyncThunk("auth/GetMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:3500/me");
        return response.data;
    } catch (error) {
        const message = error.response.data.msg
        return thunkAPI.rejectWithValue(message);
    }
}, { withCredentials: true });

export const LogOut = createAsyncThunk("auth/LogOut", async (_, thunkAPI) => {
    try {
        const response = await axios.delete("http://localhost:3500/logout");
        return response.data;
    } catch (error) {
        const message = error.response.data.msg
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
            builder.addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            builder.addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            })

            //  Get me
            builder.addCase(GetMe.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(GetMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = action.payload;
            })
            builder.addCase(GetMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            })

            // Logout
            builder.addCase(LogOut.pending, (state) => {
                state.isLoading = true;
            })
            builder.addCase(LogOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            builder.addCase(LogOut.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.msg = action.payload;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
