import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:5000/score";

const gameApiSlice = createApi({
	reducerPath: "gameApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (build) => ({
		pointsChange: build.query({
			query: (body) => ({
				url: "/set",
				body: {
					...body,
				},
				method: "POST",
			}),
		}),
		
	}),
});

export const { useLazyPointsChangeQuery } = gameApiSlice;

export default gameApiSlice;
