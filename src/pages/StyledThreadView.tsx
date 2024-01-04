import BasicCommentList from "../components/CommentList";
import { selectComments } from "../redux/slices/commentSlice";
import { deleteThread, selectThreadById, selectThreads } from "../redux/slices/threadSlice";
import ThreadItem from "../components/ThreadItem";
import { RootState } from "../redux/store"; // Import RootState type
import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import Thread from "../types/Thread";
import { Button, Fade, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const StyledThreadView: React.FC = () => {
    const [isShowTips, setIsShowTips] = useState(false);
    const comments = useSelector(selectComments);
    const { id }: { id?: string } = useParams();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectLoggedInUser);
    const threads: Thread[] = useSelector(selectThreads); // Declare the 'threads' variable and provide its type
    const dispatch = useDispatch();

    const handleDeleteThread = (threadId: string) => {
        const threadToDelete = threads.find((thread: Thread) => thread.id === threadId); // Specify the type of the 'thread' parameter

        if (threadToDelete && isLoggedIn && threadToDelete.author === user?.username) {
            dispatch(deleteThread(threadId));
        }
    };

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
                loggedIn={isLoggedIn}
                loggedInUsername={user?.username}
                onDelete={() => handleDeleteThread(id ?? "")}
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
