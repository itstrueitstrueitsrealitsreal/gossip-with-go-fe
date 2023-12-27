import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button, Card, CardContent, Typography, ThemeProvider, createTheme, Box } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

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
    function post() {
        if (inputComment === "") {
            alert("The comment field is blank!");
            return;
        }
        const confirmed = window.confirm("Post comment?");
        if (confirmed) {
            const newComment: Comment = {
                body: inputComment,
                author: author === "" ? "Anonymous" : author,
                timestamp: new Date(),
            };
            setComments([...comments, newComment]);
            setInputComment(""); // Clear the input field after posting
        }
    }
    const [inputComment, setInputComment] = useState(""); // State to store the input value
    const [comments, setComments] = useState<Comment[]>([
        {
            body:
                "Any fool can write code that a computer can understand.\n" +
                "Good programmers write code that humans can understand.\n" +
                " ~ Martin Fowler",
            author: "Benedict",
            timestamp: new Date(2022, 10, 28, 10, 33, 30),
        },
        {
            body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
            author: "Casey",
            timestamp: new Date(2022, 11, 1, 11, 11, 11),
        },
        {
            body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
            author: "Duuet",
            timestamp: new Date(2022, 11, 2, 10, 30, 0),
        },
    ]);
    const [author, setAuthor] = useState("");
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

                <BasicCommentList comments={comments} />
                <Button
                    variant="outlined"
                    color="primary"
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
                <Box sx={{ marginBottom: "16px" }}>
                    <TextField
                        id="standard-multiline-flexible"
                        multiline
                        maxRows={4}
                        placeholder="Type your comments here..."
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={inputComment}
                        onChange={(e) => setInputComment(e.target.value)}
                    />
                </Box>
                <Box sx={{ marginBottom: "16px" }}>
                    <TextField
                        id="author"
                        label="Username"
                        placeholder="Username"
                        variant="standard"
                        sx={{ width: "100%" }}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={post}
                    style={{ flexDirection: "row", justifyContent: "center" }}
                >
                    {"Post"}
                </Button>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/thread/1/styled"
                    style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem" }}
                >
                    {"Go to example"}
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default BasicThreadView;
