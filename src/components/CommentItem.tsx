import Comment from "../types/Comment";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

type Props = {
    comment: Comment;
    onDelete: () => void;
    loggedInUsername?: string;
    loggedIn: boolean;
};

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
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

const CommentItem: React.FC<Props> = ({ comment, onDelete, loggedIn, loggedInUsername }) => {
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
                    {loggedIn && loggedInUsername === comment.author && (
                        <>
                            <Button variant="contained" color="error" onClick={onDelete} sx={{ marginBottom: ".5rem" }}>
                                Delete comment
                            </Button>
                            <br />
                            <Button component="button" variant="contained" color="ochre" onClick={() => {}}>
                                Edit comment
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default CommentItem;
