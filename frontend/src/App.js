import Navbar from "./components/Navbar";
import PDFUpload from "./components/PDFUpload";
import ChatBox from "./components/ChatBox";

function App() {

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            <Navbar />

            <div className="max-w-5xl mx-auto p-6 space-y-6">

                <PDFUpload />

                <ChatBox />

            </div>

        </div>
    );
}

export default App;