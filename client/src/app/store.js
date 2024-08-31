import { configureStore } from '@reduxjs/toolkit';
import { cryptoAPI } from '../services/cryptoAPI';
import { cryptoNewsAPI } from '../services/cryptoNewsAPI';
import { cryptoExchangesAPI } from '../services/cryptoExchangesAPI';

export default configureStore({
    reducer: {
        [cryptoAPI.reducerPath]: cryptoAPI.reducer,
        [cryptoNewsAPI.reducerPath]: cryptoNewsAPI.reducer,
        [cryptoExchangesAPI.reducerPath]: cryptoExchangesAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cryptoAPI.middleware)
            .concat(cryptoNewsAPI.middleware)
            .concat(cryptoExchangesAPI.middleware),
});