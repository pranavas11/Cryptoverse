import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoAPIHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST
};

const createRequest = (url) => ({url, headers: cryptoAPIHeaders});

// fetch all required endpoints for the Coinranking API
export const cryptoAPI = createApi({
    reducerPath: 'cryptoAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_API_URL}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),

		getCryptoDetails: builder.query({
			query: (coinID) => createRequest(`/coin/${coinID}`),
		}),

		getCryptoHistory: builder.query({
			query: ({ coinID, timePeriod }) => createRequest(`/coin/${coinID}/history?timePeriod=${timePeriod}`),
		}),
    })
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoAPI;