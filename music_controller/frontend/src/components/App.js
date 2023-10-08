import React, {Component, useEffect} from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

function App(){
    useEffect(() => {

    }, []);

    return (
            <div className="center">
                <HomePage />
            </div>
        );
}


const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;