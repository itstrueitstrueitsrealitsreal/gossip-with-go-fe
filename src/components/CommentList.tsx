import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

import React from "react";

interface CommentProps {
    comments: Comment[];
}
const BasicCommentList: React.FC<CommentProps> = ({ comments }: CommentProps) => {
    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem comment={comment} key="" />
            ))}
        </ul>
    );
};

export default BasicCommentList;
