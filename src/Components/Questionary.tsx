import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2"

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
    

    // Function to randomize one word from the database list
    const randomizeWord = ( wordList:Word[] ) => {
        //ev.preventDefault();
        let randomIndex = Math.floor( Math.random() * wordList.length );
        setSelectedWord(wordList[randomIndex])
        return wordList[randomIndex];
    }


    // Function to check the answer
    const checkAnswer = (  ) => {
        
        const splittedWord:string[] = selectedWord.portuguese_meaning.split(',');

        let foundFlag = splittedWord.some(( word ) => {
            return answerValue.toLocaleLowerCase() == word.trim().toLowerCase();
        })
        
        if ( foundFlag ){
        // Error modal
            Swal.fire({
                icon: "success",
                title: "Voce Acertou!",
                text: `Resposta correta: ${selectedWord.portuguese_meaning}`,
                footer: `Você digitou: ${answerValue}`,
                timer: 1000 * 10,
                background: "#0A0A0A",
                color: "#a855f7",
                customClass: {
                    confirmButton: 'swal2-confirm',
                },
                buttonsStyling: false,
            });
            
        } else {
            // Error modal
            Swal.fire({
                icon: "error",
                title: "Voce errou...",
                text: `Resposta correta: ${selectedWord.portuguese_meaning}`,
                footer: `Você digitou: ${answerValue}`,
                timer: 1000 * 10,
                background: "#0A0A0A",
                color: "#a855f7",
                customClass: {
                    confirmButton: 'swal2-confirm',
                },
                buttonsStyling: false,
            });
        }

        setAnswerValue("");
        randomizeWord(data);
    }
    

    // Handle enter
    const handleKeyDown = (ev:React.KeyboardEvent<HTMLInputElement>) => {
        ev.key == "Enter" ? checkAnswer() : null;
    }

    // Fetch Data from Supabase
    useEffect(() => {
        async function fetchData() {
          try {
            let { data, error } = await supabase
              .from<any, any>("englishBooster")
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


    return(
        <>
        { data && data.length > 0 ? (
            <div>
                <p className="text-4xl md:text-5xl lg:text-5xl text-center text-purple-500 font-extrabold">{ selectedWord.english_word }</p>
                <div className="flex flex-col mt-5 gap-5">
                    <label htmlFor="answer" className="text-left">Qual é o significado?</label>
                    <input type="text" name="answer_input" value={answerValue} onChange={(ev) => setAnswerValue(ev.target.value)} onKeyDown={(ev) => handleKeyDown(ev)} id="answer_input" className="py-2 px-4 rounded-lg border-1-purple" />
                    
                    <div className="flex w-full gap-5">
                        <button className="bg-purple-500 w-full hover:border-purple-700 hover:bg-purple-600" onClick={() => checkAnswer()} onKeyDown={() => checkAnswer()} >Verificar</button>
                        <button className="bg-orange-500 w-full hover:border-orange-700 hover:bg-orange-600" onClick={() => randomizeWord(data)}>Outra</button>
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