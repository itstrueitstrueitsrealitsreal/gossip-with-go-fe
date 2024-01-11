import { RootState } from "../store";
import Comment from "../../types/Comment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the thunk to fetch comments
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
                threadId: comment.thread_id,
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

// Define the thunk to add a comment
export const addComment = createAsyncThunk("comments/addComment", async (newComment: Comment) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    });
    console.log("added new comment: ", JSON.stringify(newComment));
    if (!response.ok) {
        throw new Error("Failed to add comment");
    }
    return newComment;
});

// Define the thunk to edit a comment
export const editComment = createAsyncThunk("comments/editComment", async (editedComment: Comment) => {
    const { id, ...updatedComment } = editedComment;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedComment),
    });
    if (!response.ok) {
        throw new Error("Failed to edit comment");
    }
    return editedComment;
});

// Define the thunk to delete a comment
export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }
    return commentId;
});

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
    reducers: {},
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
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                state.comments.push(action.payload);
            })
            .addCase(editComment.fulfilled, (state, action: PayloadAction<Comment>) => {
                const { id, content } = action.payload;
                const comment = state.comments.find((c) => c.id === id);
                if (comment) {
                    comment.content = content;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
                const commentIndex = state.comments.findIndex((c) => c.id === action.payload);
                if (commentIndex !== -1) {
                    state.comments.splice(commentIndex, 1);
                }
            });
    },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsByThreadId = (threadId: string) => (state: RootState) =>
    state.comments.comments.filter((comment) => comment.thread_id === threadId);
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
