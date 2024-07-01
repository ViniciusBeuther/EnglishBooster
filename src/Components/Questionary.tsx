import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Spinner } from "@nextui-org/react";
import WrongModal from "./WrongModal";

interface Word {
    id: number,
    english_word: string,
    portuguese_meaning: string
}


const Questionary:React.FC = () => {
    const [data, setData] = useState<Word[]>([]);
    const [selectedWord, setSelectedWord] = useState<Word>({
        id: 0,
        english_word: "",
        portuguese_meaning: "",
    });
    const [answerValue, setAnswerValue] = useState("");
    
    const randomizeWord = ( wordList:Word[] ) => {
        //ev.preventDefault();
        let randomIndex = Math.floor( Math.random() * wordList.length );
        console.log(wordList[randomIndex])
        setSelectedWord(wordList[randomIndex])
        return wordList[randomIndex];
    }

    const checkAnswer = ( ev:any ) => {
        ev.preventDefault();
        
        if ( answerValue.toLowerCase() == selectedWord.portuguese_meaning.toLowerCase() ){
            alert("Voce Acertou!");
            setAnswerValue("");
            randomizeWord(data);
            <WrongModal />
        } else {
            alert("Você errou!");
            setAnswerValue("");
            randomizeWord(data);
        }
    }

    const handleKeyDown = (ev:React.KeyboardEvent<HTMLInputElement>) => {
        ev.key == "Enter" ? checkAnswer(ev) : null;
    }

    useEffect(() => {
        async function fetchData() {
          try {
            let { data, error } = await supabase
              .from<Word>("englishBooster")
              .select("*");
    
            if (error) throw error;
    
            setData(data || []);
            randomizeWord(data || []);
          } catch (err) {
            console.log("An error occurred: ", err);
          }
        }
    
        fetchData();
      }, []);
      //console.log(data)


    return(
        <>
        { data && data.length > 0 ? (
            <div>
                <p className="text-4xl md:text-5xl lg:text-5xl text-center text-purple-500 font-extrabold">{ selectedWord.english_word }</p>
                <div className="flex flex-col mt-5 gap-5">
                    <label htmlFor="answer" className="text-left">Qual é o significado?</label>
                    <input type="text" name="answer_input" value={answerValue} onChange={(ev) => setAnswerValue(ev.target.value)} onKeyDown={(ev) => handleKeyDown(ev)} id="answer_input" className="py-2 px-4 rounded-lg" />
                    
                    <div className="flex w-full gap-5">
                        <button className="bg-purple-500 w-full hover:border-purple-700 hover:bg-purple-600" onClick={(ev:any) => checkAnswer(ev)} onKeyDown={(ev:any) => checkAnswer(ev)} >Verificar</button>
                        <button className="bg-orange-500 w-full hover:border-orange-700 hover:bg-orange-600" onClick={(ev:any) => randomizeWord(data)}>Outra</button>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex items-center justify-center">
                <Spinner size="lg" color="secondary" />
            </div>
        )}
        </>
    )
}

export default Questionary;