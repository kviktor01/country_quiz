import { createSlice } from "@reduxjs/toolkit";



const initialState = {
	userId:null,
	userName: null,
	token: null,
	maxPoint: null,
	currentPoint: null,
	isLogin: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUserData: (state, { payload }) => {
			const { userId,userName, token, maxPoint } = payload;
			state.userId=userId;
			state.userName = userName;
			state.token = token;
			state.maxPoint = maxPoint;
			state.currentPoint = 0;
		},
        setMaxPoint:(state, { payload }) => {
            state.maxPoint = payload;
        },
        setCurrentPoint:(state, { payload }) => {
            state.currentPoint =payload;
        },
		setIsLogin:(state,{payload}) => {
			state.isLogin=payload;
		},
	},
});
export const {setUserData,setIsLogin,setCurrentPoint} = authSlice.actions;
export default authSlice.reducer;

export const getUserData=(state)=>state? state.auth? state.auth:null:null;
export const getUserName=(state) => state?state.auth? state.auth.userName ? state.auth.userName:null:null:null;
export const getId=(state)=>state? state.auth?state.auth.userId:null:null;
export const getMaxPoint=(state) => state?state.auth? state.auth.maxPoint ? state.auth.maxPoint:null:null:null;
export const getCurrentPoint=(state) => state?state.auth? state.auth.currentPoint ? state.auth.currentPoint:null:null:null;
export const getIsLogin =(state)=>state? state.auth? state.auth.isLogin:null:null;