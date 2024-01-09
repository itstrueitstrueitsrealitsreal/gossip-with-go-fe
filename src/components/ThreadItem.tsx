import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";

interface ThreadItemProps {
    id: string;
    title: string;
    author: string;
    tag: string;
    content: string;
    loggedIn: boolean;
    loggedInUsername?: string;
    onDelete: () => void;
    onEdit: () => void;
    homepage: boolean;
}

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
});

const ThreadItem: React.FC<ThreadItemProps> = ({ id, title, author, tag, content, onDelete, onEdit, homepage }) => {
    useSelector(selectIsLoggedIn);
    const loggedInUser = useSelector(selectLoggedInUser);

    const authorId = useSelector((state: RootState) => {
        const users = state.users;
        const threadAuthor = users.users?.find((user) => user.username === author);
        return threadAuthor?.id;
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: "25vw", margin: "auto", textAlign: "center" }}>
                <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "center" }}>
                    <li>
                        <Link to={`/thread/${id}`} style={{ textDecoration: "none" }}>
                            <Card
                                sx={{
                                    marginTop: ".5rem",
                                    marginBottom: ".5rem",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "8px",
                                    width: "40vw",
                                }}
                                variant="outlined"
                            >
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 30 }}
                                        variant="h1"
                                        component="h1"
                                        style={{ color: "#00ADD8" }}
                                    >
                                        {title}
                                    </Typography>
                                    <br />
                                    <Typography color="textSecondary" gutterBottom>
                                        {`by ${author}`}
                                    </Typography>
                                    <Typography>{`${content}`}</Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        {`Tag: ${tag}`}
                                    </Typography>
                                    {homepage && loggedInUser && authorId === loggedInUser.id && (
                                        <>
                                            <Link to={`/`} style={{ textDecoration: "none" }}>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={onDelete}
                                                    sx={{ marginBottom: ".5rem" }}
                                                >
                                                    Delete Thread
                                                </Button>
                                            </Link>
                                            <br />
                                        </>
                                    )}
                                    {homepage && loggedInUser && authorId === loggedInUser.id && (
                                        <Link to={`/`} style={{ textDecoration: "none" }}>
                                            <Button variant="contained" color="ochre" onClick={onEdit}>
                                                Edit Thread
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    </li>
                </ul>
            </Box>
        </ThemeProvider>
    );
};

export default ThreadItem;
