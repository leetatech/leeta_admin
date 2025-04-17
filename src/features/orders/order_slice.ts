import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from './order_service';

interface InitialState {
  error: boolean;
  loading: boolean;
  orderData: Record<string, string | boolean | Record<string, string | any>[] | any>;
  orderUpdate: Record<string, string | boolean | Record<string, string | any>[] | any>;
  message: string;
  details: Record<string, Record<string, string> | any>;
  action: string;
}

const initialState: InitialState = {
  error: false,
  loading: false,
  orderData: {
    loading: false,
    data: '',
    message: '',
    error: false,
  },
  orderUpdate: {
    loading: false,
    data: '',
    message: '',
    error: false,
  },
  message: '',
  details: {},
  action: ''
};

export const triggerOrderList = createAsyncThunk('order/list', async (params: Record<string, string | any>, thunkAPI) => {
  try {
    return await OrderService.getOrderList(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const triggerOrderUpdate = createAsyncThunk('order/update_status', async (params: Record<string, string | any>, thunkAPI) => {
  try {
    return await OrderService.updateOder(params);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetState: (state) => {
      state.orderData = initialState.orderData;
    },
    resetStatusUpdate: (state) => {
      state.orderUpdate = initialState.orderUpdate;
    },
    setDetailsGenState: (state, action) => {
      state.details = action.payload;
    },
    setAction: (state, action) => {
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ORDER LIST
    builder.addCase(triggerOrderList.pending, (state) => {
      state.orderData.loading = true;
      state.orderData.error = false;
      state.orderData.data = {};
      state.orderData.message = '';
    });
    builder.addCase(triggerOrderList.fulfilled, (state, action) => {
      state.orderData.loading = false;
      state.orderData.error = false;
      state.orderData.data = action.payload!;
      state.orderData.message = '';
    });
    builder.addCase(triggerOrderList.rejected, (state) => {
      state.orderData.loading = true;
      state.orderData.error = false;
      state.orderData.data = {};
      state.orderData.message = '';
    });

    // UPDATE ORDER STATUS
    builder.addCase(triggerOrderUpdate.pending, (state) => {
      state.orderUpdate.loading = true;
      state.orderUpdate.error = false;
      state.orderUpdate.data = '';
      state.orderUpdate.message = '';
    });
    builder.addCase(triggerOrderUpdate.fulfilled, (state, action) => {
      state.orderUpdate.loading = false;
      state.orderUpdate.error = false;
      state.orderUpdate.data = action.payload!;
      state.orderUpdate.message = '';
    });
    builder.addCase(triggerOrderUpdate.rejected, (state) => {
      state.orderUpdate.loading = true;
      state.orderUpdate.error = false;
      state.orderUpdate.data = '';
      state.orderUpdate.message = '';
    });
  },
});

export const { resetState, resetStatusUpdate, setDetailsGenState, setAction } = orderSlice.actions;

export default orderSlice.reducer;
