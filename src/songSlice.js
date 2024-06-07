import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLine: 0,
    song: null
}

const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        setSong(state, action) {
            state.song = action.payload;
            state.currentLine = 0;
        },
        setCurrentLine(state, action) {
            state.currentLine = action.payload;
        }
    }
});

export const { setSong, setCurrentLine } = songSlice.actions;

export default songSlice;