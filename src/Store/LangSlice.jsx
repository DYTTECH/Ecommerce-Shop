import { createSlice } from "@reduxjs/toolkit";

const LangSlice = createSlice({
    name: "Lang",
    initialState: {
        lang: "ar",
    },
    reducers: {
        setLanguage: (state, action) => {
            state.lang = action.payload;
            localStorage.setItem("language", action.payload);
            
        },
       
    }
});

export const { setLanguage } = LangSlice.actions;
export default LangSlice.reducer;