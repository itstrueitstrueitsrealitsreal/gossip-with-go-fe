import BasicThreadList from "../components/BasicThreadList";
import { selectThreads } from "../redux/slices/threadSlice";
import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import React from "react";
import Typewriter from "typewriter-effect";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    const threads = useSelector(selectThreads);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectLoggedInUser);

    return (
        <>
            <br />
            <h3 style={{ fontWeight: "bold" }}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(80)
                            .pauseFor(1500)
                            .typeString("Welcome to ")
                            .typeString('<strong><span style="color: #00ADD8;">Gossip with Go!</span></strong>')
                            .typeString(" Click on any of the threads below to get started.")
                            .start();
                    }}
                    options={{
                        autoStart: true,
                        cursor: "|",
                    }}
                />
            </h3>
            <br />
            <BasicThreadList isLoggedIn={isLoggedIn} user={user || undefined} threads={threads} />
        </>
    );
};

export default Home;
