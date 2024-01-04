import { RootState } from "../store";
import User from "../../types/User";
import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    users: User[];
    isLoggedIn: boolean;
    loggedInUser: User | null;
}

// Helper function to hash the password
const hashPassword = (password: string) => {
    return CryptoJS.SHA256(password).toString();
};

const exampleUsers: User[] = [
    { id: "1", username: "John", password: hashPassword("password1") },
    { id: "2", username: "Jane", password: hashPassword("password2") },
    { id: "3", username: "Alice", password: hashPassword("password3") },
    { id: "4", username: "Aiken", password: hashPassword("password4") },
];

const initialState: UsersState = {
    users: exampleUsers,
    isLoggedIn: false,
    loggedInUser: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            const existingUser = state.users.find((user) => user.username === action.payload.username);
            if (existingUser) {
                return;
            }
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        loginUser: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.loggedInUser = action.payload;
            // You can perform additional actions when a user logs in
            // For example, update some state indicating that the user is logged in
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.loggedInUser = null;
            // Perform additional actions when a user logs out
        },
    },
});

// Function to check if a username is already taken
export const isUsernameTaken = (state: RootState, username: string): boolean => {
    const users = selectUsers(state); // Assuming you have a selector to get the users
    return users.some((user) => user.username === username);
};

export const { addUser, removeUser, loginUser, logoutUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUser = (state: RootState, username: string, password: string) => {
    const hashedPassword = hashPassword(password);

    return state.users.users.find((user) => user.username === username && user.password === hashedPassword);
};

export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn;

export const selectLoggedInUser = (state: RootState) => state.users.loggedInUser;

export default usersSlice.reducer;
