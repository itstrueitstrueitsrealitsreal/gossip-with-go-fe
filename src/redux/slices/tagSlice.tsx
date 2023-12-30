import { RootState } from "../store";
import Tag from "../../types/Tag";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TagsState {
    tags: Tag[];
}

const initialState: TagsState = {
    tags: [],
};

export const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        addTag: (state, action: PayloadAction<Tag>) => {
            state.tags.push(action.payload);
        },
    },
});

export const { addTag } = tagSlice.actions;

export const selectTags = (state: RootState) => state.tags;

export default tagSlice.reducer;
