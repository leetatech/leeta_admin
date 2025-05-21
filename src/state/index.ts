import { configureStore } from '@reduxjs/toolkit';
import { setDispatchFunction } from './storeInstance';
import authReducer from '../features/auth/auth_slice';
import orderReducer from '../features/orders/order_slice';
import vendorReducer from '../features/vendors/vendor_slice';

const store = configureStore({
  reducer: { 
    user: authReducer,
    order: orderReducer,
    vendors: vendorReducer
  },
});

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
