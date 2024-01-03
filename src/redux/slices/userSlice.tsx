import { RootState } from "../store";
import User from "../../types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bcrypt from "bcrypt";

interface UsersState {
    users: User[];
}

const exampleUsers: User[] = [
    { id: "1", username: "John", password: bcrypt.hashSync("password1", 10) },
    { id: "2", username: "Jane", password: bcrypt.hashSync("password2", 10) },
    { id: "3", username: "Alice", password: bcrypt.hashSync("password3", 10) },
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
