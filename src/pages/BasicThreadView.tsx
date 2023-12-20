import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

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
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <Card style={{ margin: ".5rem" }}>
                <CardContent>
                    <Typography component="p">{"Viewing thread:"}</Typography>
                    <Typography variant="h5" component="h5">
                        {"Inspirational Quotes"}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {"by Aiken"}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {'"The best way to predict the future is to invent it."'}
                        <br />
                        {"- Alan Kay"}
                    </Typography>
                </CardContent>
            </Card>

            <BasicCommentList comments={comments} />
            <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/"
                style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem", marginBottom: ".5rem" }}
            >
                {"Back to threads"}
            </Button>
            <br />
            <TextField
                id="standard-multiline-flexible"
                multiline
                maxRows={4}
                placeholder="Type your comments here..."
                variant="standard"
                style={{ margin: ".5 rem" }}
                sx={{ width: "100%" }}
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
            />
            <br />
            <TextField
                id="author"
                label="Username"
                placeholder="Username"
                variant="standard"
                style={{ margin: "auto", marginTop: ".5rem", marginBottom: ".5rem" }}
                sx={{ width: "100%" }}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <br />
            <Button
                variant="contained"
                color="primary"
                onClick={post}
                style={{ flexDirection: "row", justifyContent: "center", marginTop: ".5rem" }}
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
    );
};

export default BasicThreadView;
