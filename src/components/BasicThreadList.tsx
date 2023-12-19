import "../App.css";

import React from "react";
import { Link } from "react-router-dom";

const BasicThreadList: React.FC = () => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <h4>{"Threads:"}</h4>
            <ul>
                <li>
                    <Link to="/thread/1">{"Inspirational Quotes"}</Link>
                    {" by <User>"}
                </li>
            </ul>
        </div>
    );
};

export default BasicThreadList;
