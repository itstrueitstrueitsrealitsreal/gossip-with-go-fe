import generateId from "./generateId";
import {
    addUser,
    loginUser,
    logoutUser,
    selectUser,
    isUsernameTaken,
    deleteUser,
    fetchUsers,
} from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import User from "../types/User";
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/named
import { ThunkDispatch } from "redux-thunk";
// eslint-disable-next-line import/named
import { AnyAction } from "redux";

interface AccountButtonProps {
    isLoggedIn: boolean;
    user?: User;
}

const AccountButton: React.FC<AccountButtonProps> = ({ isLoggedIn, user }) => {
    const [open, setOpen] = useState(false);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [changeUsername, setChangeUsername] = useState("");
    const [changePassword, setChangePassword] = useState("");
    const [confirmChangePassword, setConfirmChangePassword] = useState("");
    const [changePasswordError, setChangePasswordError] = useState("");
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
    const selectedUser = useSelector((state: RootState) => selectUser(state, loginUsername, loginPassword));
    const isTaken = useSelector((state: RootState) => isUsernameTaken(state, registerUsername));

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoginUsername("");
        setLoginPassword("");
        setLoginError("");
        setOpen(false);
    };

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

    const handleLogin = async () => {
        if (loginUsername === "" || loginPassword === "") {
            setLoginError("Username and password cannot be empty!");
            return;
        }

        try {
            // Wait for the Promise to resolve and get the user
            const user = await selectedUser;

            if (user) {
                // Login successful, perform necessary actions
                dispatch(loginUser(user)); // Dispatch loginUser action
                setLoginUsername("");
                setLoginPassword("");
                setLoginError("");
                setOpen(false);
                alert("Login successful.");
            } else {
                console.log("username: ", loginUsername);
                console.log("password: ", loginPassword);
                console.log("user: ", user);
                setLoginError("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error while logging in:", error);
            setLoginError("An error occurred while logging in.");
        }
    };

    const handleRegister = async () => {
        if (registerUsername === "" || registerPassword === "" || confirmPassword === "") {
            setRegisterError("All fields are required!");
            return;
        }

        if (registerPassword !== confirmPassword) {
            setRegisterError("Passwords do not match!");
            return;
        }

        const hashedPassword = await hashPassword(registerPassword);

        if (isTaken) {
            setRegisterError("Username already exists!");
            return;
        }

        const user: User = {
            id: generateId(),
            username: registerUsername,
            password: hashedPassword,
        };

        // Perform registration logic here
        dispatch(addUser(user));

        // Reset registration-related fields
        setRegisterUsername("");
        setRegisterPassword("");
        setConfirmPassword("");
        setRegisterError("");
        setRegisterDialogOpen(false);
        dispatch(loginUser(user)); // Dispatch loginUser action
        setOpen(false);

        // Perform additional logic on successful registration
        alert("Registration successful.");
    };

    const handleLogout = () => {
        // Perform logout logic here
        dispatch(logoutUser()); // Dispatch logoutUser action
        setLoginUsername("");
        setLoginPassword("");
        alert("Logout successful.");
        setOpen(false);
    };

    const handleRegisterDialogOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterDialogClose = () => {
        setRegisterDialogOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteAccount = () => {
        // Perform delete account logic here
        dispatch(logoutUser()); // Dispatch logoutUser action
        dispatch(deleteUser(user?.id || "")); // Dispatch deleteUser action
        alert("Account deleted.");
        setOpen(false);
        setDeleteDialogOpen(false);
    };

    const handleChangeUsername = () => {
        if (!user) {
            return;
        }
        if (changeUsername === "") {
            setChangePasswordError("Username cannot be empty!");
            return;
        }

        // Perform change username logic here
        const updatedUser: User = {
            ...user,
            username: changeUsername,
        };
        logoutUser();

        // Update the user in the Redux store
        dispatch(loginUser(updatedUser));

        // Reset change username field
        setChangeUsername("");
        setChangePasswordError("");
        setConfirmChangePassword("");
        setChangePassword("");
        setLoginError("");
        setOpen(false);

        // Perform additional logic on successful username change
        alert("Username changed successfully to " + changeUsername + ".");
    };

    const handleChangePassword = async () => {
        if (!user) {
            return;
        }
        if (changePassword === "") {
            setChangePasswordError("Password cannot be empty!");
            return;
        }
        if (changePassword !== confirmChangePassword) {
            setChangePasswordError("Passwords do not match!");
            return;
        }
        const hashedPassword = await hashPassword(changePassword);
        // Perform change password logic here
        const updatedUser: User = {
            ...user,
            password: hashedPassword,
        };

        // Update the user in the Redux store
        dispatch(loginUser(updatedUser));

        // Reset change password field
        setChangePassword("");
        setChangeUsername("");
        setConfirmChangePassword("");
        setChangePasswordError("");
        setLoginError("");
        setOpen(false);

        // Perform additional logic on successful password change
        alert("Password changed successfully.");
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#2196f3",
            },
            secondary: {
                main: "#f50057",
            },
        },
        spacing: 8,
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: ".5rem",
                    }}
                >
                    Account
                </Button>
            </ThemeProvider>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isLoggedIn ? "Account Information" : "Login"}</DialogTitle>
                <DialogContent>
                    {isLoggedIn && user ? (
                        <div>
                            <p>Logged in as: {user.username}</p>
                            <TextField
                                label="New Username"
                                margin="dense"
                                type="text"
                                fullWidth
                                value={changeUsername}
                                onChange={(e) => setChangeUsername(e.target.value)}
                            />
                            <Button variant="text" color="primary" onClick={handleChangeUsername}>
                                Change Username
                            </Button>
                            <TextField
                                label="New Password"
                                type="password"
                                margin="dense"
                                fullWidth
                                value={changePassword}
                                onChange={(e) => setChangePassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                margin="dense"
                                fullWidth
                                value={confirmChangePassword}
                                onChange={(e) => setConfirmChangePassword(e.target.value)}
                            />
                            <Button variant="text" color="primary" onClick={handleChangePassword}>
                                Change Password
                            </Button>
                            {changePasswordError && <p style={{ color: "red" }}>{changePasswordError}</p>}
                        </div>
                    ) : (
                        <div>
                            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                            <TextField
                                label="Username"
                                margin="dense"
                                type="text"
                                fullWidth
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                margin="dense"
                                fullWidth
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                    )}
                </DialogContent>
                <DialogActions style={{ marginTop: "auto" }}>
                    {isLoggedIn ? (
                        <>
                            <Button variant="text" color="secondary" onClick={handleDeleteDialogOpen}>
                                Delete Account
                            </Button>
                            <Button variant="text" color="secondary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {!isLoggedIn && (
                                <div>
                                    <Button variant="text" color="primary" onClick={handleRegisterDialogOpen}>
                                        Register
                                    </Button>
                                </div>
                            )}
                            <Button variant="text" color="primary" onClick={handleLogin}>
                                Login
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
            <Dialog open={registerDialogOpen} onClose={handleRegisterDialogClose}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    {registerError && <p style={{ color: "red" }}>{registerError}</p>}
                    <TextField
                        label="Username"
                        margin="dense"
                        type="text"
                        fullWidth
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        margin="dense"
                        fullWidth
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        margin="dense"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" onClick={handleRegister}>
                        Register
                    </Button>
                    <Button variant="text" color="secondary" onClick={handleRegisterDialogClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete your account?</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="secondary" onClick={handleDeleteAccount}>
                        Delete
                    </Button>
                    <Button variant="text" color="primary" onClick={handleDeleteDialogClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountButton;
