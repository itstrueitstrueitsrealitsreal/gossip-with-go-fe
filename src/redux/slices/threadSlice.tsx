import { RootState } from "../store";
import Thread from "../../types/Thread";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThreadsState {
    threads: Thread[];
}

const initialState: ThreadsState = {
    threads: [],
};

export const threadSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        addThread: (state, action: PayloadAction<Thread>) => {
            state.threads.push(action.payload);
        },
    },
});

export const { addThread } = threadSlice.actions;

export const selectThreads = (state: RootState) => state.threads;

export default threadSlice.reducer;
