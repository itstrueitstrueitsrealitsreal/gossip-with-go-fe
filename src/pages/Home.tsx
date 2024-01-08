import BasicThreadList from "../components/BasicThreadList";
import { fetchThreads, selectThreads } from "../redux/slices/threadSlice";
import { selectIsLoggedIn, selectLoggedInUser } from "../redux/slices/userSlice";
import { RootState } from "../redux/store";
import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/named
import { ThunkDispatch } from "redux-thunk";
// eslint-disable-next-line import/named
import { AnyAction } from "redux";

const Home: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();

    useEffect(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

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
