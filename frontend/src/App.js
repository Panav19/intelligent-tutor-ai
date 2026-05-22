import React from "react";

import Navbar from "./components/Navbar";
import PDFUpload from "./components/PDFUpload";
import ChatBox from "./components/ChatBox";

function App() {

    return (

        <div>

            <Navbar />

            <div style={{ padding: "20px" }}>

                <PDFUpload />

                <hr />

                <ChatBox />

            </div>

        </div>
    );
}

export default App;
