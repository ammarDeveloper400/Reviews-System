import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { baseAPI } from 'src/services/base-api';


export const store = configureStore({
  
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(baseAPI.middleware),
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
