import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button, Card, CardContent, Fade, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import React, { useState } from "react";

const comments: Comment[] = [
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
];

const StyledThreadView: React.FC = () => {
    const [isShowTips, setIsShowTips] = useState(false);

    const showTips = () => {
        setIsShowTips(true);
    };

    const { id } = useParams();

    return (
        <div style={{ width: "30vw", margin: "auto" }}>
            <Typography>{id}</Typography>
            <Typography style={{ padding: "1em 0" }}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(80)
                            .typeString("This is much better, isn't it?")
                            .pauseFor(1000)
                            .callFunction(showTips)
                            .start();
                    }}
                />
            </Typography>
            <Fade in={isShowTips} timeout={1000}>
                <Typography style={{ paddingBottom: "1em" }}>
                    {"Try looking at the "}
                    <a href="https://mui.com/">{"Material UI"}</a>
                    {" docs to see what other components you can use!"}
                </Typography>
            </Fade>
            <Card>
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

            <Link to="/">
                <Button variant="contained" color="secondary">
                    {"Back to threads"}
                </Button>
            </Link>
        </div>
    );
};

export default StyledThreadView;
