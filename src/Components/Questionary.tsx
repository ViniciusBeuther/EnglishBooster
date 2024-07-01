import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

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
    
    const randomizeWord = ( wordList:Word[] ) => {
        //ev.preventDefault();
        let randomIndex = Math.floor( Math.random() * wordList.length );
        console.log(wordList[randomIndex])
        setSelectedWord(wordList[randomIndex])
        return wordList[randomIndex];
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
            <>
                <p>{ selectedWord.english_word }</p>
            </>
        ) : (
            <p>The question will display here....</p>
        )}
        </>
    )
}

export default Questionary;