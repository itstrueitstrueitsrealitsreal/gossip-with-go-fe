import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

interface AccountButtonProps {
    isLoggedIn: boolean;
    username: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ isLoggedIn, username }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = () => {
        // Perform login logic here
    };

    const handleLogout = () => {
        // Perform logout logic here
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
                <DialogTitle>{isLoggedIn ? "Account Information" : "Login / Register"}</DialogTitle>
                <DialogContent>
                    {isLoggedIn ? (
                        <div>
                            <p>Logged in as: {username}</p>
                        </div>
                    ) : (
                        <div>
                            <TextField label="Username" />
                            <TextField label="Password" type="password" />
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {isLoggedIn ? (
                        <Button variant="text" color="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button variant="text" color="primary" onClick={handleLogin}>
                                Login
                            </Button>
                            <Button variant="text" color="primary">
                                Register
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccountButton;
