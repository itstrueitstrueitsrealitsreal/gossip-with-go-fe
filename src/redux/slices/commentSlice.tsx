import { RootState } from "../store";
import Comment from "../../types/Comment";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CommentsState {
    comments: Comment[];
}

const initialState: CommentsState = {
    comments: [
        {
            id: "1",
            body:
                "Any fool can write code that a computer can understand.\n" +
                "Good programmers write code that humans can understand.\n" +
                " ~ Martin Fowler",
            author: "Benedict",
            timestamp: new Date(2022, 10, 28, 10, 33, 30),
        },
        {
            id: "2",
            body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
            author: "Casey",
            timestamp: new Date(2022, 11, 1, 11, 11, 11),
        },
        {
            id: "3",
            body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
            author: "Duuet",
            timestamp: new Date(2022, 11, 2, 10, 30, 0),
        },
        {
            id: "4",
            body: "If you have a procedure with 10 parameters, you probably missed some.\n" + " ~ Alan Perlis",
            author: "Ethan",
            timestamp: new Date(2022, 11, 3, 10, 30, 0),
        },
    ],
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        editComment: (state, action: PayloadAction<Comment>) => {
            const { id, body } = action.payload;
            const comment = state.comments.find((c) => c.id === id);
            if (comment) {
                comment.body = body;
            }
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            const commentIndex = state.comments.findIndex((c) => c.id === action.payload);
            if (commentIndex !== -1) {
                state.comments.splice(commentIndex, 1);
            }
        },
    },
});

export const { addComment, editComment, deleteComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export const addCommentToStore = (comment: Comment) => {
    const dispatch = useDispatch();
    dispatch(addComment(comment));
};

export const editCommentInStore = (comment: Comment) => {
    const dispatch = useDispatch();
    dispatch(editComment(comment));
};

export const deleteCommentFromStore = (commentId: string) => {
    const dispatch = useDispatch();
    dispatch(deleteComment(commentId));
};

export default commentsSlice.reducer;
