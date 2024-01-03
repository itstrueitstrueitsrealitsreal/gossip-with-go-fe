import { RootState } from "../store";
import User from "../../types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    users: User[];
}

const exampleUsers: User[] = [
    { id: "1", username: "John", password: "password1" },
    { id: "2", username: "Jane", password: "password2" },
    { id: "3", username: "Alice", password: "password3" },
];

const initialState: UsersState = {
    users: exampleUsers,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
});

export const { addUser, removeUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
