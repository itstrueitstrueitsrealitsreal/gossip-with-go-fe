import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";

interface ThreadItemProps {
    id: string;
    title: string;
    author: string;
    tag: string; // Add tag property to the interface
    content: string;
    loggedIn: boolean; // Add loggedIn property to the interface
    loggedInUsername?: string; // Add loggedInUsername property to the interface
    onDelete: () => void;
}

const ThreadItem: React.FC<ThreadItemProps> = ({
    id,
    title,
    author,
    tag,
    content,
    loggedIn,
    loggedInUsername,
    onDelete,
}) => {
    // Add tag to the destructured props
    return (
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
                                {loggedIn && loggedInUsername === author && (
                                    <Link to={`/`} style={{ textDecoration: "none" }}>
                                        <Button variant="contained" color="error" onClick={onDelete}>
                                            Delete Thread
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </Link>
                </li>
            </ul>
        </Box>
    );
};

export default ThreadItem;
