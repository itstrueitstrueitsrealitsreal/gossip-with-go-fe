import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import Typewriter from "typewriter-effect";

const Home: React.FC = () => {
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
                            .typeString('<strong><span style="color: #29BEB0;">Gossip with Go!</span></strong>')
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
            <BasicThreadList />
        </>
    );
};

export default Home;
