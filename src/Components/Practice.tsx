import { useState } from "react";
import Button from "./Button";
import Questionary from "./Questionary";

const Practice:React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState("start");

    const handleStart = (ev:any) => {
        // alert("Começou");

          
        ev.preventDefault();
        setSelectedComponent("");
    }

    return(
        <>
            {selectedComponent === "start" ? (
                <div className="mt-5 gap-5 flex flex-col items-center justify-center">
                    <p>Clique em começar para iniciar</p>
                    <button className="bg-purple-500 w-[50%] hover:bg-purple-600 hover:border-purple-700 shadow-lg" onClick={(ev:any) => handleStart(ev)}>
                        Começar
                    </button>
                </div>
            ) : (<Questionary />) }
        </>
    )
}

export default Practice;