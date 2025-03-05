import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginService from './auth_service';

interface IinitialState {
  error: boolean;
  loading: boolean;
  userData: Record<string, string>;
  userInfo: Record<string, string | any>;
  message: string;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  userInfo: {},
  message: '',
};

export const triggerSignin = createAsyncThunk('user/signin', async (params: Record<string, string>, thunkAPI) => {
  try {
    return await LoginService.signin(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const triggerGetUserInfo = createAsyncThunk('user/info', async (_, thunkAPI) => {
  try {
    return await LoginService.userInfo();
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = initialState.error;
      state.message = initialState.message;
      state.userData = initialState.userData;
    },
  },
  extraReducers: (builder) => {
    // SIGN UP

    // SIGN IN
    builder.addCase(triggerSignin.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userData = {};
      state.message = '';
    });
    builder.addCase(triggerSignin.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload!;
      state.error = false;
    });
    builder.addCase(triggerSignin.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userData = {};
      state.message = action.payload as unknown as string;
    });

    // USER INFO
    builder.addCase(triggerGetUserInfo.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.userInfo = {};
      state.message = '';
    });
    builder.addCase(triggerGetUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload!;
      state.error = false;
    });
    builder.addCase(triggerGetUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.userInfo = {};
      state.message = action.payload as unknown as string;
    });
  },
});

export const { resetState } = userSlice.actions;

export default userSlice.reducer;
