import generateId from "./generateId";
import { addUser, loginUser, logoutUser, selectUser, isUsernameTaken, deleteUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import User from "../types/User";
import CryptoJS from "crypto-js";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();
    const selectedUser = useSelector((state: RootState) => selectUser(state, loginUsername, loginPassword));
    const isTaken = useSelector((state: RootState) => isUsernameTaken(state, registerUsername));

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
    const hashPassword = (password: string) => {
        return CryptoJS.SHA256(password).toString();
    };

    const handleLogin = () => {
        if (loginUsername === "" || loginPassword === "") {
            setLoginError("Username and password cannot be empty!");
            return;
        }

        // Find the user with the matching username and password
        const user = selectedUser;

        if (user) {
            // Login successful, perform necessary actions
            dispatch(loginUser(user)); // Dispatch loginUser action
            setLoginUsername("");
            setLoginPassword("");
            setLoginError("");
            setOpen(false);
            alert("Login successful.");
        } else {
            setLoginError("Invalid username or password.");
        }
    };

    const handleRegister = () => {
        if (registerUsername === "" || registerPassword === "" || confirmPassword === "") {
            setRegisterError("All fields are required!");
            return;
        }

        if (registerPassword !== confirmPassword) {
            setRegisterError("Passwords do not match!");
            return;
        }

        if (isTaken) {
            setRegisterError("Username already exists!");
            return;
        }

        const user: User = {
            id: generateId(),
            username: registerUsername,
            password: registerPassword,
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

    const handleChangePassword = () => {
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

        // Perform change password logic here
        const updatedUser: User = {
            ...user,
            password: hashPassword(changePassword),
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
