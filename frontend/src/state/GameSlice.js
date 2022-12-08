import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPoint:0,
    maxPoint:0,
    ranking:null,
    others:null,
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setCurrentPoint: (state, { payload }) => {
			
			state.currentPoint = payload;
		},
        setMaxPoint:(state, { payload }) => {
            state.maxPoint = payload;
        },
		setRank:(state,{payload}) => {
			state.ranking=payload;
		},
        setOthers:(state,{payload})=>{
            state.others=payload;
        }
	},
});
export const {setCurrentPoint,setMaxPoint,setRank,setOthers} = gameSlice.actions;
export default gameSlice.reducer;
export const getUserData=(state)=>state? state.game? state.game:null:null;
export const getMaxPoint=(state) => state?state.game? state.game.maxPoint :null:null;
export const getCurrentPoint=(state) => state?state.game? state.game.currentPoint :null:null;
