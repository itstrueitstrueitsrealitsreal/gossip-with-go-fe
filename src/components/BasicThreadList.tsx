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
import generateId from "./generateId";
import Thread from "../types/Thread";
import { addThread } from "../redux/slices/threadSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    // eslint-disable-next-line import/named
    SelectChangeEvent,
    MenuItem,
} from "@mui/material";

interface ThreadListProps {
    threads: Thread[];
}

const BasicThreadList: React.FC<ThreadListProps> = ({ threads }: ThreadListProps) => {
    const [open, setOpen] = useState(false);
    const [newThread, setNewThread] = useState("");
    const [newThreadTitle, setNewThreadTitle] = useState("");
    const [newThreadAuthor, setNewThreadAuthor] = useState("");
    const [newThreadTag, setNewThreadTag] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
    };

    const handleNewThreadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewThread(event.target.value);
    };

    const handleNewThreadTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewThreadTitle(event.target.value);
    };

    const handleNewThreadAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewThreadAuthor(event.target.value);
    };

    const handleNewThreadTagChange = (event: SelectChangeEvent<string>) => {
        setNewThreadTag(event.target.value);
    };

    const handleCreateThread = () => {
        if (!newThread || !newThreadTitle || !newThreadAuthor || !newThreadTag) {
            setError("Please fill in all the required fields.");
            return;
        }

        const thread: Thread = {
            id: generateId(), // generate a unique id
            title: newThreadTitle,
            content: newThread,
            author: newThreadAuthor,
            tag: newThreadTag,
        };

        dispatch(addThread(thread));
        handleClose();
    };

    const tags = [
        { name: "Discussion" },
        { name: "Question" },
        { name: "Looking for Advice" },
        { name: "Meme" },
        { name: "Misc" },
        { name: "Poll" },
    ];

    return (
        <>
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                Threads:
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
                New Thread
            </Button>
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
                    <li key={thread.id} style={{ listStyleType: "none" }}>
                        <ThreadItem id={thread.id} title={thread.title} author={thread.author} tag={thread.tag} />
                    </li>
                ))}
            </ul>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Thread</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={newThreadTitle}
                        onChange={handleNewThreadTitleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Thread Content"
                        type="text"
                        fullWidth
                        value={newThread}
                        onChange={handleNewThreadChange}
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        value={newThreadAuthor}
                        onChange={handleNewThreadAuthorChange}
                    />
                    <Select
                        value={newThreadTag}
                        onChange={handleNewThreadTagChange}
                        displayEmpty
                        fullWidth
                        margin="dense"
                        label="Tag"
                    >
                        <MenuItem value="" disabled>
                            Select a tag
                        </MenuItem>
                        {tags.map((tag) => (
                            <MenuItem key={tag.name} value={tag.name}>
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateThread}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BasicThreadList;
