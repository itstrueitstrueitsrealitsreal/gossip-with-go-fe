import { RootState } from "../store";
import Comment from "../../types/Comment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (threadId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/threads/${threadId}/comments`);

            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }

            const responseData = await response.json();

            const comments = responseData.payload.data.map((comment: Comment) => ({
                id: comment.id,
                threadId: comment.threadId,
                content: comment.content,
                author: comment.author,
                timestamp: new Date(comment.timestamp),
            }));

            return comments;
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    },
);

interface CommentsState {
    comments: Comment[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: CommentsState = {
    comments: [],
    status: "idle",
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.push(action.payload);
        },
        editComment: (state, action: PayloadAction<Comment>) => {
            const { id, content } = action.payload;
            const comment = state.comments.find((c) => c.id === id);
            if (comment) {
                comment.content = content;
            }
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            const commentIndex = state.comments.findIndex((c) => c.id === action.payload);
            if (commentIndex !== -1) {
                state.comments.splice(commentIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
                state.status = "succeeded";
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.toString() ?? "Unknown error"; // handle the payload appropriately
            });
    },
});

export const { addComment, editComment, deleteComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsByThreadId = (threadId: string) => (state: RootState) =>
    state.comments.comments.filter((comment) => comment.threadId === threadId);
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;

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
