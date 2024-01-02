import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface ThreadItemProps {
    id: string;
    title: string;
    author: string;
    tag: string; // Add tag property to the interface
    content: string;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ id, title, author, tag, content }) => {
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
                            </CardContent>
                        </Card>
                    </Link>
                </li>
            </ul>
        </Box>
    );
};

export default ThreadItem;
