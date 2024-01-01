/**
 * Renders a basic thread list component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Thread[]} props.threads - The array of threads to display.
 * @returns {JSX.Element} The rendered BasicThreadList component.
 */
import "../App.css";

import ThreadItem from "./ThreadItem";
import Thread from "../types/Thread";
import React from "react";
import { Typography } from "@mui/material";

interface ThreadListProps {
    threads: Thread[];
}

const BasicThreadList: React.FC<ThreadListProps> = ({ threads }: ThreadListProps) => {
    return (
        <>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                Threads:
            </Typography>
            <ul
                style={{
                    listStyleType: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                {threads.map((thread) => (
                    <li key="" style={{ listStyleType: "none" }}>
                        <ThreadItem id={thread.id} title={thread.title} author={thread.author} tag={thread.tag} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default BasicThreadList;
