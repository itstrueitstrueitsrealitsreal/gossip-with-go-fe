import "../App.css";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";

const BasicThreadList: React.FC = () => {
    return (
        <Box sx={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                Threads:
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "center" }}>
                <li>
                    <Link to="/thread/1" style={{ textDecoration: "none" }}>
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
                                        sx={{ fontSize: 30, fontWeight: 400 }}
                                        variant="h1"
                                        component="h1"
                                        style={{ color: "#00ADD8" }}
                                    >
                                        {"Inspirational Quotes"}
                                    </Typography>
                                    <br />
                                    <Typography color="textSecondary" gutterBottom>
                                        {"by Aiken"}
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

export default BasicThreadList;
