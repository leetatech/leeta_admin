import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { setDispatchFunction } from './storeInstance';
import authReducer from '../features/auth/auth_slice';
import orderReducer from '../features/orders/order_slice';

const store = configureStore({
  reducer: { 
    user: authReducer,
    order: orderReducer 
  },
  // middleware: [thunkMiddleware],
});

// Set the dispatch function in the store instance
setDispatchFunction(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
