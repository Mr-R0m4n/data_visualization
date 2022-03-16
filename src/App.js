import Main from "./components/Layout/Main";
import Sidebar from "./components/Layout/Sidebar";
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [displaySidebar, setDisplaySidebar] = useState('inherit');
    const [displayMain, setDisplayMain] = useState('inherit');

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 420px)").matches
    )

    useEffect(() => {
        window
            .matchMedia("(min-width: 420px)")
            .addEventListener('change', e => setMatches( e.matches ));
        if(!matches){
            setDisplaySidebar('none');
            setDisplayMain('inherit');
        }
        else if(matches){
            setDisplaySidebar('inherit')
            setDisplayMain('inherit');
        }

    }, [matches]);

    const toggleViewHandler = () => {
        if(displaySidebar === 'inherit'){
            setDisplaySidebar('none');
            setDisplayMain('inherit');
        } else {
            setDisplaySidebar('inherit');
            setDisplayMain('none');
        }

    };

    return (
        <div className="container">
            <Sidebar display={displaySidebar}/>
            <Main display={displayMain}/>
            <button onClick={toggleViewHandler} type={"button"}>Toggle View</button>
        </div>
    );
}

export default App;
