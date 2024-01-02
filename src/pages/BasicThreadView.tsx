import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { selectComments, addComment } from "../redux/slices/commentSlice";
import {
    Button,
    Card,
    CardContent,
    Typography,
    ThemeProvider,
    createTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

declare module "@mui/material/styles" {
    interface PaletteOptions {
        ochre?: {
            main: string;
            light?: string;
            dark?: string;
            contrastText?: string;
        };
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        ochre: true;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f50057",
        },
        ochre: {
            main: "#E3D026",
            light: "#E9DB5D",
            dark: "#A29415",
            contrastText: "#242105",
        },
    },
    spacing: 8,
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    marginBottom: 16,
                    borderRadius: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                    width: "40vw", // Increase the width of the card
                    justifyContent: "center", // Center the cards
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 16,
                    whiteSpace: "pre-wrap",
                    paddingBottom: 8,
                    color: "#333333", // Make the text more visible
                },
                body2: {
                    color: "#888888",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: 16,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    marginBottom: 16,
                },
            },
        },
    },
});

const BasicThreadView: React.FC = () => {
    const [inputComment, setInputComment] = useState(""); // State to store the input value
    const comments = useSelector(selectComments);
    const [author, setAuthor] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();

    const [error, setError] = useState<string>("");

    function postComment() {
        if (inputComment.trim() === "") {
            // Set the error message if the comment is empty
            setError("Please enter a non-empty comment.");
            return;
        }

        const newComment: Comment = {
            body: inputComment,
            author: author === "" ? "Anonymous" : author,
            timestamp: new Date(),
        };

        dispatch(addComment(newComment));
        handleClose();
        setInputComment("");
        // Clear the error message
        setError("");
    }

    const { id } = useParams();

    return (
        <ThemeProvider theme={theme}>
            <Typography>{id}</Typography>
            <div
                style={{
                    width: "40vw",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "1rem",
                }}
            >
                <Card variant="outlined">
                    <CardContent>
                        <Typography component="p">{"Viewing thread:"}</Typography>
                        <Typography sx={{ fontSize: 30 }} variant="h1" component="h1" style={{ color: "#00ADD8" }}>
                            {"Inspirational Quotes"}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            {"by Aiken"}
                        </Typography>
                        <Typography variant="body1" component="p">
                            {'"The best way to predict the future is to invent it."'}
                            <br />
                            {"- Alan Kay"}
                        </Typography>
                    </CardContent>
                </Card>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem" }}
                >
                    {"New Comment"}
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="post-comment-dialog-title"
                    aria-describedby="post-comment-dialog-description"
                >
                    <DialogTitle id="post-comment-dialog-title">{"Post Comment"}</DialogTitle>
                    <DialogContent>
                        {error && (
                            <Typography variant="body2" color="error" component="p">
                                {error}
                            </Typography>
                        )}

                        <TextField
                            margin="dense"
                            label="Your Comment"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={inputComment}
                            onChange={(e) => setInputComment(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Username"
                            type="text"
                            fullWidth
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={postComment} color="primary">
                            Post Comment
                        </Button>
                    </DialogActions>
                </Dialog>
                <BasicCommentList comments={comments} />
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color="ochre"
                        component={Link}
                        to="/"
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: ".5rem",
                            marginBottom: ".5rem",
                        }}
                    >
                        {"Back to threads"}
                    </Button>
                </ThemeProvider>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={"/thread/" + id + "/styled"}
                    style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem" }}
                >
                    {"Go to example"}
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default BasicThreadView;
