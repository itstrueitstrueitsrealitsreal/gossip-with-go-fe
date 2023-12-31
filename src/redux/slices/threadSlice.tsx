import { RootState } from "../store";
import Thread from "../../types/Thread";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the thunk to fetch threads
export const fetchThreads = createAsyncThunk("threads/fetchThreads", async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/threads/");
    if (!response.ok) {
        throw new Error("Failed to fetch threads");
    }

    const responseData = await response.json();
    return responseData.payload.data;
});

interface ThreadsState {
    threads: Thread[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ThreadsState = {
    threads: [],
    status: "idle",
    error: null,
};

export const threadSlice = createSlice({
    name: "threads",
    initialState,
    reducers: {
        addThread: (state, action: PayloadAction<Thread>) => {
            state.threads.push(action.payload);
        },
        editThread: (state, action: PayloadAction<Thread>) => {
            const { id, ...updatedThread } = action.payload;
            const threadIndex = state.threads.findIndex((thread) => thread.id === id);
            if (threadIndex !== -1) {
                state.threads[threadIndex] = { ...state.threads[threadIndex], ...updatedThread };
            }
        },
        deleteThread: (state, action: PayloadAction<string>) => {
            const threadIndex = state.threads.findIndex((thread) => thread.id === action.payload);
            if (threadIndex !== -1) {
                state.threads.splice(threadIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThreads.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchThreads.fulfilled, (state, action: PayloadAction<Thread[]>) => {
                state.status = "succeeded";
                state.threads = action.payload;
            })
            .addCase(fetchThreads.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.toString() ?? "Unknown error";
            });
    },
});

export const { addThread, editThread, deleteThread } = threadSlice.actions;

export const selectThreads = (state: RootState) => state.threads.threads;
export const selectThreadById = (state: RootState, id: string) =>
    state.threads.threads.find((thread) => thread.id === id);
export const selectThreadsStatus = (state: RootState) => state.threads.status;
export const selectThreadsError = (state: RootState) => state.threads.error;

export default threadSlice.reducer;
