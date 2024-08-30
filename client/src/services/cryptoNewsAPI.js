import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST
};

const createRequest = (url) => ({url, headers: cryptoNewsHeaders});

export const cryptoNewsAPI = createApi({
    reducerPath: 'cryptoNewsAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_NEWS_API_URL}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ count }) => createRequest(`?limit=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsAPI;