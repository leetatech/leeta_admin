/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Dispatch } from 'redux';

let dispatchFunction: Dispatch<any> | null = null;

export const setDispatchFunction = (dispatch: Dispatch<any>) => {
  dispatchFunction = dispatch;
};

export const dispatchAction = (action: any) => {
  if (dispatchFunction != null) {
    dispatchFunction(action);
  }
};
