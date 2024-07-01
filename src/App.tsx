import { useState } from "react";
import WordForm from "./Components/WordForm";
import SavedWordsList from "./Components/SavedWordsList";
import Practice from "./Components/Practice";


const App = () => {
  const [selected, setSelected] = useState("Nova");
  let component: any = null;
  

  if( selected == "Nova" ){
    component = <WordForm />;
  } 
  else if ( selected == "Editar" ){
    component = <SavedWordsList />;
  } else{
    component = <Practice />;
  }
  
  
  return(
    <div className="border p-5">
      <h2>English Booster</h2>
      <nav className="flex my-2">
        <span className={`${selected == "Nova" ? "text-purple-500 font-bold bg-purple-200" : "text-white"} hover:cursor-pointer py-1 px-2`} onClick={() => setSelected("Nova")}>Nova</span>
        <span className={`${selected == "Editar" ? "text-purple-500 font-bold bg-purple-200" : "text-white"} hover:cursor-pointer py-1 px-2`} onClick={() => setSelected("Editar")}>Editar</span>
        <span className={`${selected == "Praticar" ? "text-purple-500 font-bold bg-purple-200" : "text-white"} hover:cursor-pointer py-1 px-2`} onClick={() => setSelected("Praticar")}>Praticar</span>
      </nav>

        {component}
    </div>
  )
}

export default App;