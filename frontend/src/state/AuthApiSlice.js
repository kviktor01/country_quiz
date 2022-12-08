import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/auth";

const authApiSlice = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		login: build.query({
			query: (body) => ({
				url: "/login",
				body: {
					...body,
				},
				method: "POST",
			}),
		}),
		signUp: build.query({
			query: (body) => ({
				url: "/signup",
				body: {
					...body,
				},
				method: "POST",
			}),
		}),
		
	}),
});

export const { useLazyLoginQuery, useLazySignUpQuery } = authApiSlice;

export default authApiSlice;
