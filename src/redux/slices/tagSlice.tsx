import { RootState } from "../store";
import Tag from "../../types/Tag";
// eslint-disable-next-line import/named
import { createSlice, ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<Tag>) => {
            state.tags.push(action.payload);
        },
        fetchTagsStart: (state) => {
            state.status = "loading";
        },
        fetchTagsSuccess: (state, action: PayloadAction<{ data: Tag[] }>) => {
            state.status = "succeeded";
            state.tags = action.payload.data;
        },
        fetchTagsFailure: (state, action: PayloadAction<string | null>) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
});

// Define a type for the dispatch function that matches the actual action types
type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const fetchTags = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(tagSlice.actions.fetchTagsStart());
            const response = await fetch("https://gossip-with-go.onrender.com/tags");
            const responseData = await response.json();
            console.log("API Response Data:", responseData);

            // Assuming responseData is the structure you provided
            dispatch(tagSlice.actions.fetchTagsSuccess(responseData.payload));
        } catch (error) {
            console.error("API Fetch Error:", error);
            dispatch(tagSlice.actions.fetchTagsFailure((error as Error).message ?? null));
        }
    };
};

export const selectTags = (state: RootState) => state.tags.tags;
export const selectTagsStatus = (state: RootState) => state.tags.status;
export const selectTagsError = (state: RootState) => state.tags.error;

export const { addTag, fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } = tagSlice.actions;

export default tagSlice.reducer;
