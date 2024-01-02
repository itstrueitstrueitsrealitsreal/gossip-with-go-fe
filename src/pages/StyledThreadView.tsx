import BasicCommentList from "../components/CommentList";
import { selectComments } from "../redux/slices/commentSlice";
import { selectThreadById } from "../redux/slices/threadSlice";
import ThreadItem from "../components/ThreadItem";
import { RootState } from "../redux/store"; // Import RootState type
import { Button, Fade, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const StyledThreadView: React.FC = () => {
    const [isShowTips, setIsShowTips] = useState(false);
    const comments = useSelector(selectComments);
    const { id }: { id?: string } = useParams();

    const thread = useSelector((state: RootState) => selectThreadById(state, id ?? ""));
    const showTips = () => {
        setIsShowTips(true);
    };

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
            <ThreadItem
                id={id ?? ""}
                title={thread?.title ?? ""}
                author={thread?.author ?? ""}
                tag={thread?.tag ?? ""}
                content={thread?.content ?? ""}
            />

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
