import React from "react";
import "@aws-amplify/ui-react/styles.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Register} from "./pages/Register";
import {Home} from "./pages/Home";
import {LoginResult} from "./pages/LoginResult";


const App = () => (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/LoginResult" element={<LoginResult />} />
            </Routes>
        </BrowserRouter>
);

export default App;