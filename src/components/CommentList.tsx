import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import { deleteComment } from "../redux/slices/commentSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface CommentProps {
    comments: Comment[];
}
const BasicCommentList: React.FC<CommentProps> = ({ comments }: CommentProps) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectLoggedInUser);
    const handleDeleteComment = (commentId: string) => {
        const commentToDelete = comments.find((comment) => comment.id === commentId);

        if (commentToDelete && isLoggedIn && commentToDelete.author === user?.username) {
            dispatch(deleteComment(commentId));
        }
    };

    return (
        <ul>
            {comments &&
                comments.map((comment) => (
                    <CommentItem
                        comment={comment}
                        loggedIn={isLoggedIn}
                        loggedInUsername={user?.username}
                        onDelete={() => handleDeleteComment(comment.id)}
                        key={comment.id}
                    />
                ))}
        </ul>
    );
};

export default BasicCommentList;
