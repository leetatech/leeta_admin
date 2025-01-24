import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LoginService from './auth_service';

interface IinitialState {
  error:boolean
  loading: boolean;
  userData:Record<string,string>;
  message:string;
}

const initialState: IinitialState = {
  error: false,
  loading: false,
  userData: {},
  message: '',
};

export const triggerSignin = createAsyncThunk('user/signin', async (params: Record<string, string>, thunkAPI) => {
  try {
    return await LoginService.signin(params);
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
  },
});

export const {resetState} = userSlice.actions;

export default userSlice.reducer;
