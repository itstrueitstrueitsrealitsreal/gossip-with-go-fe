import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import Typewriter from "typewriter-effect";

const Home: React.FC = () => {
    return (
        <>
            <br />
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .changeDelay(80)
                        .pauseFor(1500)
                        .typeString("<h3>Welcome to </h3>")
                        .typeString('<strong><span style="color: #29BEB0;">Gossip with Go!</span></strong>')
                        .typeString("<h3> Click on any of the threads below to get started.</h3>")
                        .start();
                }}
            />
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
