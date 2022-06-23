import { configureStore } from "@reduxjs/toolkit";
import moodsReducer from "../features/moodsSlice";

export const store = configureStore({
    reducer: {
        moods: moodsReducer,
    },
});
