import { useEffect, useState } from "react";
import Button from "./Button";
import { supabase } from "../supabase/supabase";


const WordForm = () => {
    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");

    const insertInDatabase = async (word: string, meaning: string) => {
      
    const { data, error } = await supabase
    .from('englishBooster')
    .insert([
      { english_word: `${word}`, portuguese_meaning: `${meaning}` },
    ])
    .select()
        
      
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
    }
  
    function handleSubmit(ev:any){
        ev.preventDefault()
        insertInDatabase( word, meaning );
        alert(`palavra: ${word}\nsignificado: ${meaning}`)
        setWord("");
        setMeaning("");
    }

  return (
    <form action="submit" onSubmit={(ev:any) => handleSubmit(ev)}>
      <section className="flex flex-col mt-2">
        <label htmlFor="wordform__newWord" className="text-left">Palavra: </label>
        <input
          type="text"
          name="newWord"
          id="wordform__newWord"
          value={word}
          onChange={(ev:any) => setWord(ev.target.value)}
          className="bg-black py-2 px-4 border-purple-300 border-2 rounded-md"
        />
      </section>
      <section className="flex flex-col my-2">
        <label htmlFor="wordform__newWord" className="text-left">Significado: </label>
        <input
          type="text"
          name="meaning"
          id="wordform__meaning"
          value={meaning}
          onChange={(ev:any) => setMeaning(ev.target.value)}
          className="bg-black py-2 px-4 border-purple-300 border-2 rounded-md mb-5"
        />
      </section>

      <Button type="submit" text={"Adicionar"} />
    </form>
  );
};

export default WordForm;
