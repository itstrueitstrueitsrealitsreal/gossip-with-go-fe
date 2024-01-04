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
            id: "1",
            author: "Aiken",
            tag: "Discussion",
            title: "Inspirational Quotes",
            content: "The best way to predict the future is to invent it.\n- Alan Kay",
        },
        {
            id: "2",
            author: "Emma",
            tag: "Question",
            title: "Favorite Programming Language",
            content: "What is your favorite programming language and why?",
        },
        {
            id: "3",
            author: "Frank",
            tag: "Looking for Advice",
            title: "Career Change",
            content: "I'm considering a career change. Any advice?",
        },
        {
            id: "4",
            author: "Grace",
            tag: "Meme",
            title: "Funny Programming Memes",
            content: "Share your favorite programming memes!",
        },
        {
            id: "5",
            author: "Henry",
            tag: "Misc",
            title: "Book Recommendations",
            content: "Looking for book recommendations. Any genre!",
        },
        {
            id: "6",
            author: "Isabella",
            tag: "Poll",
            title: "Favorite Movie Genre",
            content: "What is your favorite movie genre?",
        },
        {
            id: "7",
            author: "Jack",
            tag: "Discussion",
            title: "Favorite Programming Language",
            content: "What is your favorite programming language and why?",
        },
        {
            id: "8",
            author: "Lily",
            tag: "Question",
            title: "Inspirational Quotes",
            content: "Share your favorite inspirational quotes!",
        },
        {
            id: "9",
            author: "Max",
            tag: "Looking for Advice",
            title: "Career Change",
            content: "Any advice for someone considering a career change?",
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
});

export const { addThread, editThread, deleteThread } = threadSlice.actions;

export const selectThreads = (state: RootState) => state.threads.threads;

export const selectThreadById = (state: RootState, id: string) => {
    return state.threads.threads.find((thread) => thread.id === id);
};

export default threadSlice.reducer;
