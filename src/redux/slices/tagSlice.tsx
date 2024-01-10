import { RootState } from "../store";
import Tag from "../../types/Tag";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const fetchTags = createAsyncThunk("tags/fetchTags", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/tags/`);

        if (!response.ok) {
            throw new Error("Failed to fetch tags");
        }

        const responseData = await response.json();

        const tags = responseData.payload.data.map((tag: Tag) => ({
            id: tag.id,
            name: tag.name,
        }));

        return tags;
    } catch (err) {
        return rejectWithValue((err as Error).message);
    }
});

// Get tag by id
export const getTagById = (state: RootState, tagId: string): Tag | undefined => {
    return state.tags.tags.find((tag) => tag.id === tagId);
};

// Other synchronous action creators
export const addTag = (tag: Tag) => {
    return { type: "tags/addTag", payload: tag };
};

// Initial state for tags
interface TagsState {
    tags: Tag[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: TagsState = {
    tags: [],
    status: "idle",
    error: null,
};

// Create a slice with reducers and async thunk
export const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        // Other synchronous reducers
        clearTags: (state) => {
            state.tags = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
                state.status = "succeeded";
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.toString() ?? "Unknown error"; // handle the payload appropriately
            });
    },
});

// Export the synchronous action creators
export const { clearTags } = tagSlice.actions;

// Selectors for accessing the state
export const selectTags = (state: RootState) => state.tags.tags;
export const selectTagsStatus = (state: RootState) => state.tags.status;
export const selectTagsError = (state: RootState) => state.tags.error;

// Export the reducer
export default tagSlice.reducer;
