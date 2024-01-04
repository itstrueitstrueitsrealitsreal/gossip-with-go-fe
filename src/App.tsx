import Home from "./pages/Home";
import BasicThreadView from "./pages/BasicThreadView";
import store from "./redux/store";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import { Provider } from "react-redux";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/thread/:id" element={<BasicThreadView />} />
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        </div>
    );
};

export default App;
