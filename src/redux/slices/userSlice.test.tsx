import { RootState } from "../store";
import { selectUser } from "./userSlice";

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

// Mock crypto module
const mockCrypto = {
    subtle: {
        digest: async (_algorithm: string, data: ArrayBuffer) => {
            // Create a simple hash for testing purposes
            const hashArray = new Uint8Array(data.byteLength);
            hashArray.fill(1); // Use a constant value for simplicity
            return hashArray.buffer;
        },
    },
};

// Mock TextEncoder
class MockTextEncoder {
    encode(str: string): Uint8Array {
        const buf = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            buf[i] = str.charCodeAt(i);
        }
        return buf;
    }
}

// Assign mocks to global object
(global as any).crypto = mockCrypto;
(global as any).TextEncoder = MockTextEncoder;

describe("selectUser", () => {
    it("should return the matching user when username and password are correct", async () => {
        const state: RootState = {
            users: {
                users: [
                    { id: "1", username: "user1", password: await hashPassword("password1") }, // Hash the password using the hashPassword function
                    { id: "2", username: "user2", password: await hashPassword("password2") }, // Hash the password using the hashPassword function
                ],
                isLoggedIn: false,
                loggedInUser: null,
            },
            comments: {
                comments: [],
            },
            tags: {
                tags: [],
                status: "idle",
                error: null,
            },
            threads: {
                threads: [],
                status: "loading",
                error: null,
            },
        };

        const username = "user1";
        const password = "password1";

        const result = await selectUser(state, username, password);

        expect(result).toEqual({ id: "1", username: "user1", password: await hashPassword("password1") }); // Hash the password in the expected result
    });

    it("should return null when username or password is incorrect", async () => {
        const state: RootState = {
            users: {
                users: [
                    { id: "1", username: "user1", password: await hashPassword("password1") }, // Hash the password using the hashPassword function
                    { id: "2", username: "user2", password: await hashPassword("password2") }, // Hash the password using the hashPassword function
                ],
                isLoggedIn: false,
                loggedInUser: null,
            },
            comments: {
                comments: [],
            },
            tags: {
                tags: [],
                status: "idle",
                error: null,
            },
            threads: {
                threads: [],
                status: "loading",
                error: null,
            },
        };

        const username = "user1";
        const password = "incorrectPassword";

        const result = await selectUser(state, username, password);

        expect(result).toBeNull();
    });

    it("should return null when state.users or state.users.users is undefined", async () => {
        const state: RootState = {
            users: {
                users: [],
                isLoggedIn: false,
                loggedInUser: null,
            },
            comments: {
                comments: [],
            },
            tags: {
                tags: [],
                status: "idle",
                error: null,
            },
            threads: {
                threads: [],
                status: "loading",
                error: null,
            },
        };

        const username = "user1";
        const password = "password1";

        const result = await selectUser(state, username, password);

        expect(result).toBeNull();
    });
});
