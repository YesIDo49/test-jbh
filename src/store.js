import { configureStore } from "@reduxjs/toolkit";
import songSlice from "./songSlice";

export default configureStore({
    reducer: {
        song: songSlice.reducer
    }
});
