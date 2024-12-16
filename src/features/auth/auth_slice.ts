/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IinitialState {}

const initialState: IinitialState = {};

export const triggerSignin = createAsyncThunk('auth/signin', async (params: Record<string, string>, thunkAPI) => {
  try {
    // return await LoginService.signin(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SIGN UP

    // SIGN IN
    builder.addCase(triggerSignin.pending, (state) => {});
    builder.addCase(triggerSignin.fulfilled, (state, action) => {});
    builder.addCase(triggerSignin.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
