import { RootState } from "../store";
import Comment from "../../types/Comment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [],
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

export const { addComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;

export default commentsSlice.reducer;
