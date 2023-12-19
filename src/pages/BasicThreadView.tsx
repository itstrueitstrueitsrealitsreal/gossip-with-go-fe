import BasicCommentList from "../components/CommentList";
import CommentItem from "../components/CommentItem";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const BasicThreadView: React.FC = () => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h3>{"Inspirational Quotes"}</h3>
            <h4>{"Thread started by Aiken"}</h4>
            <BasicCommentList styled={false} />
            <Link to="/">{`<- Back to threads`}</Link>
            <br />
            <br />
            <CommentItem
                comment={{
                    body:
                        "Any fool can write code that a computer can understand.\n" +
                        "Good programmers write code that humans can understand.\n" +
                        " ~ Martin Fowler",
                    author: "Benedict",
                    timestamp: new Date(2022, 10, 28, 10, 33, 30),
                }}
            ></CommentItem>
            <Button variant="contained" color="primary" component={Link} to="/thread/1/styled">
                {"Post"}
            </Button>
        </div>
    );
};

export default BasicThreadView;
