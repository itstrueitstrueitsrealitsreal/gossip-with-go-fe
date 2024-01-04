import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { selectComments, addComment } from "../redux/slices/commentSlice";
import { deleteThread, selectThreadById, selectThreads } from "../redux/slices/threadSlice";
import ThreadItem from "../components/ThreadItem";
import { RootState } from "../redux/store"; // Import RootState type
import generateId from "../components/generateId";
import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import Thread from "../types/Thread";
import AccountButton from "../components/AccountButton";
import {
    Button,
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
            main: "#2196f3",
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
    const [inputComment, setInputComment] = useState("");
    const comments = useSelector(selectComments);
    const [open, setOpen] = useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectLoggedInUser);
    const { id }: { id?: string } = useParams();
    const threads: Thread[] = useSelector(selectThreads); // Declare the 'threads' variable and provide its type

    const handleDeleteThread = (threadId: string) => {
        const threadToDelete = threads.find((thread: Thread) => thread.id === threadId); // Specify the type of the 'thread' parameter

        if (threadToDelete && isLoggedIn && threadToDelete.author === user?.username) {
            dispatch(deleteThread(threadId));
        }
    };

    const thread = useSelector((state: RootState) => selectThreadById(state, id ?? "")); // Ensure id is of type number

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
            setError("Please enter a non-empty comment.");
            return;
        }

        const newComment: Comment = {
            id: generateId(),
            body: inputComment,
            author: user?.username ?? "",
            timestamp: new Date(),
        };

        dispatch(addComment(newComment));
        handleClose();
        setInputComment("");
        setError("");
    }

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    width: "40vw",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "1rem",
                }}
            >
                <ThreadItem
                    id={id ?? ""}
                    title={thread?.title ?? ""}
                    author={thread?.author ?? ""}
                    tag={thread?.tag ?? ""}
                    content={thread?.content ?? ""}
                    loggedIn={isLoggedIn}
                    loggedInUsername={user?.username}
                    onDelete={() => handleDeleteThread(id ?? "")}
                    onEdit={() => {}}
                    homepage={false}
                />
                <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    {"New Comment"}
                </Button>
                <AccountButton isLoggedIn={isLoggedIn} user={user || undefined} />
                {isLoggedIn && user ? (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="post-comment-dialog-title"
                        aria-describedby="post-comment-dialog-description"
                        PaperProps={{
                            style: {
                                minWidth: "50vw",
                            },
                        }}
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
                            <DialogContent>
                                <Typography color="textSecondary" style={{ textAlign: "center" }}>
                                    Posting as: {user?.username}
                                </Typography>
                            </DialogContent>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={postComment} color="primary">
                                Post Comment
                            </Button>
                        </DialogActions>
                    </Dialog>
                ) : (
                    <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>Login Required</DialogTitle>
                        <DialogContent>
                            <Typography>Please login to create a new thread using the account button below.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                )}
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
            </div>
        </ThemeProvider>
    );
};

export default BasicThreadView;
