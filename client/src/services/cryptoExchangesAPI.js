import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangesAPIHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	'x-rapidapi-host': process.env.REACT_APP_EXCHANGES_API_HOST
};

const createRequest = (url) => ({url, headers: cryptoExchangesAPIHeaders});

// fetch the /exchanges endpoint from the API
export const cryptoExchangesAPI = createApi({
    reducerPath: 'cryptoExchangesAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_EXCHANGES_API_URL}),
    endpoints: (builder) => ({
        getExchanges: builder.query({
			query: () => createRequest(`/api/exchanges/`),
		}),
    })
});

export const { useGetExchangesQuery } = cryptoExchangesAPI;