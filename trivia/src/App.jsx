import StartPage from "./Components/StartPage";
import Quiz from "./Components/Quiz";

import { useState, useEffect } from "react";

export default function App() {

    const [display, setDisplay] = useState(true)


    function toggle() {
        setDisplay(!display)
    }

    return (
        <div>

            {display == true ? < StartPage toggle={toggle} /> : <Quiz />}



        </div>
    )
}