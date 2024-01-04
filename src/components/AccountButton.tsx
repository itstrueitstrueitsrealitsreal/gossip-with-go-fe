import { loginUser, selectUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
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
    username: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ isLoggedIn, username }) => {
    const [open, setOpen] = useState(false);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const selectedUser = useSelector((state: RootState) => selectUser(state, loginUsername, loginPassword));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = () => {
        if (loginUsername === "" || loginPassword === "") {
            setLoginError("Username and password cannot be empty");
            return;
        }

        if (selectedUser) {
            alert("Login successful");
            dispatch(loginUser(selectedUser)); // Dispatch the loginUser action
            // Additional logic you want to perform on successful login
        } else {
            setLoginError("Invalid username or password");
        }
    };

    const handleLogout = () => {
        // Perform logout logic here
    };

    const handleRegister = () => {
        if (registerUsername === "" || registerPassword === "" || confirmPassword === "") {
            setRegisterError("All fields are required");
            return;
        }

        if (registerPassword !== confirmPassword) {
            setRegisterError("Passwords do not match");
            return;
        }

        // Perform registration logic here
    };

    const handleRegisterDialogOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterDialogClose = () => {
        setRegisterDialogOpen(false);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#f50057",
            },
        },
        spacing: 8,
    });

    return (
        <div style={{ marginBottom: "1rem" }}>
            <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem" }}
                >
                    Account
                </Button>
            </ThemeProvider>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isLoggedIn ? "Account Information" : "Login"}</DialogTitle>
                <DialogContent>
                    {isLoggedIn ? (
                        <div>
                            <p>Logged in as: {username}</p>
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
                        <Button variant="text" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            {!isLoggedIn && (
                                <div>
                                    {registerError && <p style={{ color: "red" }}>{registerError}</p>}
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
        </div>
    );
};

export default AccountButton;
