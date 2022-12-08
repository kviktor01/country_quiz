import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "./AuthApiSlice";
import AuthSlice from "./AuthSlice";
import countryApiSlice from "./countryApiSlice";
import CountrySlice from "./CountrySlice";
import gameApiSlice from "./GameApiSlice";
import GameSlice from "./GameSlice";


//const initialState={};
export const store = configureStore({
    reducer:{
        countryApi:countryApiSlice.reducer,
        countries:CountrySlice,
        authApi:authApiSlice.reducer,
        auth:AuthSlice,
        gameApi:gameApiSlice.reducer,
        game:GameSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countryApiSlice.middleware,authApiSlice.middleware,gameApiSlice.middleware),
}
);