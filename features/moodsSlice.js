import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    uid: null,
    username: null,
    addingMood: false,
    noMoods: true,
};

export const moodsSlice = createSlice({
    name: "moods",
    initialState,
    reducers: {
        setAddingMood: (state, action) => {
            state.addingMood = action.payload;
        },
        setUid: (state, action) => {
            state.uid = action.payload.uid;
            state.username = action.payload.username;
        },
        setMoods: (state, action) => {
            state.value = action.payload;
        },
        addMood: (state, action) => {
            state.value.push(action);
        },
        removeMood: (state, action) => {
            state.value = state.value.filter(
                (mood) => mood.id !== action.payload
            );
        },
        editMood: (state, action) => {
            state.value = state.value.map((mood) => {
                if (mood.id === action.payload.id) {
                    return action.payload;
                }
                return mood;
            });
        },
    },
});

export const { setMoods, addMood, removeMood, editMood, setUid, setAddingMood } = moodsSlice.actions;
export default moodsSlice.reducer;
