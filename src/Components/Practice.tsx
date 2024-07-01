import { useState } from "react";
import Button from "./Button";
import Questionary from "./Questionary";


const Practice:React.FC = () => {
    const [data, setData] = useState<Word[]>([]);
    const [selectedComponent, setSelectedComponent] = useState("start");

    const handleStart = (ev:any) => {
        alert("Começou");
        ev.preventDefault();
        setSelectedComponent("");
    }

    return(
        <>
            {selectedComponent === "start" ? (
                <div className="border gap-5">
                    <p>Clique em começar para iniciar</p>
                    <button color="danger" onClick={(ev:any) => handleStart(ev)}>
                        Começar
                    </button>
                </div>
            ) : (<Questionary />) }
        </>
    )
}

export default Practice;