import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import VendorService from './vendor_service';

interface InitialState {
  error: boolean;
  loading: boolean;
  vendorData: Record<string, string | boolean | Record<string, string | any>[] | any>;
  vendorUpdate: Record<string, string | boolean | Record<string, string | any>[] | any>;
  message: string;
  details: Record<string, Record<string, string> | any>;
  action: string;
}

const initialState: InitialState = {
  error: false,
  loading: false,
  vendorData: {
    loading: false,
    error: false,
    data: [],
    message: '',
  },
  vendorUpdate: {
    loading: false,
    error: false,
    data: null,
    message: '',
  },
  details: {},
  message: '',
  action: '',
};

export const triggerVendorList = createAsyncThunk('vendor/list', async (params: Record<string, string | any>, thunkAPI) => {
  try {
    return await VendorService.getVendorList(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

// Slice
const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    resetVendorData(state) {
      state.vendorData = initialState.vendorData;
    },
    resetVendorUpdate(state) {
      state.vendorUpdate = initialState.vendorUpdate;
    },
    setVendorDetails(state, action: PayloadAction<Record<string, any>>) {
      state.details = action.payload;
    },
    setVendorAction(state, action: PayloadAction<string>) {
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerVendorList.pending, (state) => {
        state.vendorData.loading = true;
        state.vendorData.error = false;
        state.vendorData.message = '';
        state.vendorData.data = [];
      })
      .addCase(triggerVendorList.fulfilled, (state, action) => {
        state.vendorData.loading = false;
        state.vendorData.error = false;
        state.vendorData.data = action.payload;
        state.vendorData.message = '';
      })
      .addCase(triggerVendorList.rejected, (state, action) => {
        state.vendorData.loading = false;
        state.vendorData.error = true;
        state.vendorData.message = action.payload || 'Failed to load vendors';
        state.vendorData.data = [];
      });
  },
});

export default vendorSlice.reducer;
