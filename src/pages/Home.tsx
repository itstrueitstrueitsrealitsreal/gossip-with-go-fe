import BasicThreadList from "../components/BasicThreadList";
import React from "react";
import Typewriter from "typewriter-effect";

const Home: React.FC = () => {
    const exampleProps = [
        {
            id: 1,
            author: "Aiken",
            tag: "Inspirational",
            title: "Inspirational Quotes",
            content: "The best way to predict the future is to invent it.\n- Alan Kay",
        },
        {
            id: 2,
            author: "Bella",
            tag: "Technology",
            title: "Latest Tech News",
            content: "Check out the latest tech news and updates!",
        },
        {
            id: 3,
            author: "Charlie",
            tag: "Food",
            title: "Delicious Recipes",
            content: "Discover mouth-watering recipes to satisfy your taste buds.",
        },
        {
            id: 4,
            author: "David",
            tag: "Travel",
            title: "Travel Destinations",
            content: "Explore the most beautiful travel destinations around the world.",
        },
    ];

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
            <BasicThreadList threads={exampleProps} />
        </>
    );
};

export default Home;
