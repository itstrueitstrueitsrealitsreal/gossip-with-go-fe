import { RootState } from "../store";
import Comment from "../../types/Comment";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [
        {
            body:
                "Any fool can write code that a computer can understand.\n" +
                "Good programmers write code that humans can understand.\n" +
                " ~ Martin Fowler",
            author: "Benedict",
            timestamp: new Date(2022, 10, 28, 10, 33, 30),
        },
        {
            body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
            author: "Casey",
            timestamp: new Date(2022, 11, 1, 11, 11, 11),
        },
        {
            body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
            author: "Duuet",
            timestamp: new Date(2022, 11, 2, 10, 30, 0),
        },
        {
            body: "If you have a procedure with 10 parameters, you probably missed some.\n" + " ~ Alan Perlis",
            author: "Ethan",
            timestamp: new Date(2022, 11, 3, 10, 30, 0),
        },
    ],
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
    },
});

const { reducer, actions } = commentsSlice;

export default reducer;
export const { addComment } = actions;
export const selectComments = (state: RootState) => state.comments.comments;
