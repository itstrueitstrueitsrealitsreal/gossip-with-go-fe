import "../App.css";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const BasicThreadList: React.FC = () => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <Typography>{"Threads:"}</Typography>
            <ul>
                <li>
                    <Link to="/thread/1" style={{ textDecoration: "none" }}>
                        <Card style={{ marginTop: ".5rem", marginBottom: ".5rem" }}>
                            <CardContent>
                                <Typography variant="h5" component="h5">
                                    {"Inspirational Quotes"}
                                </Typography>
                                <Typography color="textSecondary">{"by Aiken"}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default BasicThreadList;
