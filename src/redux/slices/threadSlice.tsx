import { RootState } from "../store";
import Thread from "../../types/Thread";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThreadsState {
    threads: Thread[];
}

const initialState: ThreadsState = {
    threads: [
        {
            id: 1,
            author: "Aiken",
            tag: "Inspirational",
            title: "Inspirational Quotes",
            content: "The best way to predict the future is to invent it.\n- Alan Kay",
        },
        {
            id: 2,
            author: "Bella",
            tag: "Technology",
            title: "Latest Tech News",
            content: "Check out the latest tech news and updates!",
        },
        {
            id: 3,
            author: "Charlie",
            tag: "Food",
            title: "Delicious Recipes",
            content: "Discover mouth-watering recipes to satisfy your taste buds.",
        },
        {
            id: 4,
            author: "David",
            tag: "Travel",
            title: "Travel Destinations",
            content: "Explore the most beautiful travel destinations around the world.",
        },
    ],
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

export const selectThreads = (state: RootState) => state.threads.threads;

export const selectThreadById = (state: RootState, id: number) => {
    return state.threads.threads.find((thread) => thread.id === id);
};

export default threadSlice.reducer;
