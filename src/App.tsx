import { useState } from "react";
import WordForm from "./Components/WordForm";
import SavedWordsList from "./Components/SavedWordsList";
import Practice from "./Components/Practice";

const App = () => {
  const [selected, setSelected] = useState("Nova");
  let component: any = null;

  if (selected == "Nova") {
    component = <WordForm />;
  } else if (selected == "Editar") {
    component = <SavedWordsList />;
  } else {
    component = <Practice />;
  }

  return (
    <div className=" p-8 rounded-xl shadow-lg bg-black w-[350px] md:w-[450px] lg:w-[625px] text-center">
      <h2
        className={`${
          selected == "Praticar" ? "hidden" : "block"
        } md:block lg:block`}
      >
        English Booster
      </h2>
      <nav className="flex my-2 items-center justify-center">
        <span
          className={`${
            selected == "Nova"
              ? "text-purple-500 font-bold bg-purple-200 rounded-lg py-1 px-2"
              : "text-white"
          } hover:cursor-pointer py-1 px-2`}
          onClick={() => setSelected("Nova")}
        >
          Nova
        </span>
        <span
          className={`${
            selected == "Editar"
              ? "text-purple-500 font-bold bg-purple-200 rounded-lg py-1 px-2"
              : "text-white"
          } hover:cursor-pointer py-1 px-2 hidden md:block lg:block`}
          onClick={() => setSelected("Editar")}
        >
          Editar
        </span>
        <span
          className={`${
            selected == "Praticar"
              ? "text-purple-500 font-bold bg-purple-200 rounded-lg py-1 px-2"
              : "text-white"
          } hover:cursor-pointer py-1 px-2`}
          onClick={() => setSelected("Praticar")}
        >
          Praticar
        </span>
      </nav>

      {component}
    </div>
  );
};

export default App;
