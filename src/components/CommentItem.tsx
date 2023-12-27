import Comment from "../types/Comment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    comment: Comment;
};

const theme = createTheme({
    spacing: 8,
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    marginBottom: 16,
                    borderRadius: 4,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 16,
                    whiteSpace: "pre-wrap",
                    paddingBottom: 8,
                },
                body2: {
                    color: "#888888",
                },
            },
        },
    },
});

const useStyles = makeStyles(() => ({
    metadata: {
        fontSize: 14,
        color: "#888888",
    },
}));

const CommentItem: React.FC<Props> = ({ comment }) => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {comment.body}
                    </Typography>
                    <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                        {"Posted by " + comment.author + " on " + comment.timestamp.toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default CommentItem;
