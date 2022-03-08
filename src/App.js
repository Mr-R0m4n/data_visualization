import Main from "./components/Layout/Main";
import Sidebar from "./components/Layout/Sidebar";
import './App.css'

function App() {
    return (
        <div className="container">
            <Sidebar/>
            <Main/>
        </div>
    );
}

export default App;
