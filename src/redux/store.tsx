import commentsReducer from "./slices/commentSlice";
import tagsReducer from "./slices/tagSlice";
import threadsReducer from "./slices/threadSlice";
import usersReducer from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        comments: commentsReducer,
        tags: tagsReducer,
        threads: threadsReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
