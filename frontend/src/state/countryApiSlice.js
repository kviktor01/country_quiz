import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://restcountries.com/v3.1/";

const countryApiSlice = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getCountries: build.query({
      query: (body) => ({url:'all'})
    }),
    
  }),
});

export const {useLazyGetCountriesQuery} = countryApiSlice ;

export default countryApiSlice;
