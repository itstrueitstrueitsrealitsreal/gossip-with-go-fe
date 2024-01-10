import { RootState } from "../store";
import User from "../../types/User";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
    users: User[];
    isLoggedIn: boolean;
    loggedInUser: User | null;
}

// Helper function to hash the password
async function hashPassword(password: string | undefined) {
    // Convert the password string to an ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Calculate the SHA-256 hash
    const buffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the hash ArrayBuffer to a hex-encoded string
    const hashedPassword = Array.from(new Uint8Array(buffer))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    return hashedPassword;
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const responseData = await response.json();

        const users = responseData.payload.data.map((user: User) => ({
            id: user.id,
            username: user.username,
            password: user.password,
        }));

        return users;
    } catch (err) {
        return rejectWithValue((err as Error).message);
    }
});

const initialState: UsersState = {
    users: [],
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
                // Return an error informing the user that the username is already taken
                throw new Error("Username is already taken");
            }
            state.users.push(action.payload);
        },
        removeUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        editUsername: (state, action: PayloadAction<{ id: string; newUsername: string }>) => {
            const user = state.users.find((user) => user.id === action.payload.id);
            if (user) {
                const existingUser = state.users.find((user) => user.username === action.payload.newUsername);
                if (existingUser) {
                    // Return an error informing the user that the username is already taken
                    throw new Error("Username is already taken");
                }
                user.username = action.payload.newUsername;
            }
        },
        editPassword: (state, action: PayloadAction<{ id: string; newPassword: string }>) => {
            const user = state.users.find((user) => user.id === action.payload.id);
            if (user) {
                // Hash the new password asynchronously
                hashPassword(action.payload.newPassword).then((hashedPassword) => {
                    user.password = hashedPassword;
                });
            }
        },

        loginUser: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.loggedInUser = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.loggedInUser = null;
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    },
});

// Function to check if a username is already taken
export const isUsernameTaken = (state: RootState, username: string): boolean => {
    const users = state.users?.users || []; // Use optional chaining to handle potential undefined objects
    return users.some((user) => user.username === username);
};

export const { addUser, removeUser, editUsername, editPassword, loginUser, logoutUser, deleteUser } =
    usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;

export const selectUser = async (state: RootState, username: string, password: string): Promise<User | null> => {
    const hashedPassword = await hashPassword(password);

    // Check if state.users and state.users.users are defined
    if (!state.users || !state.users.users) {
        return null;
    }

    const matchingUser = state.users.users.find(
        (user) => user.username === username && user.password === hashedPassword,
    );

    return matchingUser || null;
};

export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn;

export const selectLoggedInUser = (state: RootState) => state.users.loggedInUser;

export default usersSlice.reducer;
