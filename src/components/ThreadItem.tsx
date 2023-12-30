import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface ThreadItemProps {
    threadId: number;
    title: string;
    author: string;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ threadId, title, author }) => {
    return (
        <Box sx={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "center" }}>
                <li>
                    <Link to={`/thread/${threadId}`} style={{ textDecoration: "none" }}>
                        <Card
                            sx={{
                                marginTop: ".5rem",
                                marginBottom: ".5rem",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                                width: "40vw",
                            }}
                        >
                            <Card variant="outlined">
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
                                </CardContent>
                            </Card>
                        </Card>
                    </Link>
                </li>
            </ul>
        </Box>
    );
};

export default ThreadItem;
