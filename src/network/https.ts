import axios from 'axios';

interface IAjax {
  method: string;
  url: string;
  data: Record<string, any>;
  baseURL: string;
  headers?: Record<string, string>;
  before: () => void;
  after: () => void;
  mutate: boolean;
  success: () => void;
  error: () => void;
  handleError: boolean;
  serverError: boolean;
  formErrors: boolean;
  axiosProps: Record<string, string>;
}

const URL = process.env.API_BASE_URL;

// Axios instance
export const axiosInstance = axios.create({
  baseURL: URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor callbacks
// Request Success
const requestInterceptorSuccessCB = async (successfulReq: any) => {
  if (successfulReq.method === 'post' || successfulReq.method === 'POST') {
    const dataWithCtoken = {
      ...successfulReq.data,
    };

    successfulReq.data = JSON.stringify(dataWithCtoken);
  }

  const authToken = localStorage.getItem('leeta_token') ? JSON.parse(localStorage.getItem('leeta_token') as string) : null;

  if (authToken) {
    successfulReq.headers.Authorization = `Bearer ${authToken as string}`;
  }

  return successfulReq;
};

// Request Error
const requestInterceptorErrorCB = async (error: any) => {
  if (error.config.method === 'post' || error.config.method === 'POST') {
    error.response = {
      ...error.response,
      data: JSON.parse(error.response.data),
    };
  }
  return await Promise.reject(error);
};

// Response interceptor callbacks
// Response Success
const responseInterceptorSuccessCB = (successRes: any) => {

  if (successRes.config.method === 'post' || successRes.config.method === 'POST') {
  }
  return successRes;
};

// Response Error
const responseInterceptorErrorCB = async (error: any) => {
  //   const originalRequest = error.config;
  if (error.response?.status === 401) {
    window.location.replace('/');
  }
  return await Promise.reject(error.response.data);
};

(() => {
  // Request interceptor
  axiosInstance.interceptors.request.use(requestInterceptorSuccessCB, requestInterceptorErrorCB);

  // Response interceptor
  axiosInstance.interceptors.response.use(responseInterceptorSuccessCB, responseInterceptorErrorCB);
})();

// Handle Response Data
const handleHttpResponse = (response: Record<string, any>, success: (arg: Record<string, any>) => void) => {
  // No Data Was Returned
  if (!response.data) {
    return;
  }

  if (!response.data.error_reference) {
    success(response);
  }
};

// Handle Response Errors
interface HttpError {
  response: Record<string, any>;
  error: ({ status }: any) => void;
  formErrors: boolean;
}
function handleHttpError({ response, error, formErrors }: HttpError) {
  // No Response Was Returned
  if (!response) {
    error({ status: 449 });
    return;
  }

  error(response);

  // Handle Error States / Codes
  switch (response.status) {
    case 400:
      // Bad Request
      break;
    case 404:
      // Not Found
      break;
    case 419:
      // X-CSRF-TOKEN Error
      break;
    case 422:
      if (formErrors) {
        // Input Data Error
      }
      break;
    case 500:
      // Server Error
      break;
    case 504:
      // Gateway Timeout
      break;

    // ================================================================================
    // ================================================================================
    // Custom Error Codes
    // ================================================================================
    // ================================================================================
    case 449:
      // Just Try Again
      break;
    default:
      // Unknown Error
      break;
  }
}

// Send HTTP Request
async function ajax({
  method = 'GET',
  url,
  data,
  baseURL,
  headers = {},
  before = () => {},
  success = () => {},
  error = () => {},
  handleError = true,
  serverError = false,
  formErrors = true,
  axiosProps = {},
}: IAjax) {
  // Request Response And Error
  interface Result {
    data:
      | {
          error_reference?: string;
          error_code?: number;
          error_type?: string;
          message?: string;
        }
      | Record<string, string>
      | any;
    error?: boolean;
  }

  let result: Result = {
    data: {},
  };
  // Call Before Function
  before();

  // Send Request
  await axiosInstance({
    // Request URL
    url,
    // Request Method
    method,
    // To overwrite in case
    baseURL,
    // Post Data
    data,
    // Request Headers
    headers,
    // Axios Specific Properties
    ...axiosProps,
  })
    .then((response) => {
      // Assign Request Response
      result = response.data;
      if (result.data.error_reference) {
        throw new Error(`${result.data.error_code} ${result.data.message as string}`);
      }

      // Handle Responses
      handleHttpResponse(response, success);
    })
    .catch((err) => {
      // Assign Response Error
      result.error = true;
      result.data = { ...err.data };
      // Handle Errors
      if (handleError) {
        handleHttpError({
          ...err,
          error,
          serverError,
          formErrors,
        });
      }
    });

  // Call After Function With Response As Parameter
  //   after(result);

  return result;
}

// Send GET Requests
export const get = async (payload: any) => await ajax({ ...payload, method: 'GET' });

// Send POST Requests
export const post = async (payload: any) => await ajax({ ...payload, method: 'POST' });

// Send Delete Requests
export const del = async (payload: any) => await ajax({ ...payload, method: 'DELETE' });

// Send put Requests
export const put = async (payload: any) => await ajax({ ...payload, method: 'PUT' });
