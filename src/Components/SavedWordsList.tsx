import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Table, TableColumn, TableHeader, TableBody, TableRow, TableCell, Spinner, table } from "@nextui-org/react";
import editIcon from "/edit.svg"

interface EnglishBooster {
    id: number;
    english_word: string;
    portuguese_meaning: string;
}

interface TableColumnsTypes {
    key: string;
    label: string; // Use 'label' instead of 'Label'
}

const handleRemove = async ( ev:any, wordId:Number, setData:any, data:EnglishBooster[] ) => {
    ev.preventDefault();
    
    try{
        const { error } = await supabase
        .from('englishBooster')
        .delete()
        .eq('id', `${wordId}`)
        setData(data.filter(word => word.id !== wordId));
    } 
    catch( error ){
        return console.log("error")
    }
            
}


const SavedWordsList = () => {
    const [data, setData] = useState<EnglishBooster[]>([]);
    const [tableColumns, setTableColumns] = useState<TableColumnsTypes[]>([
        {
            key: "id",
            label: "ID" // Use 'label' instead of 'Label'
        },
        {
            key: "english_word",
            label: "Palavra" // Correct the key to match the data
        },
        {
            key: "portuguese_meaning",
            label: "Significado" // Correct the key to match the data
        },
        {
            key: "edit",
            label: "Editar"
        },
        {
            key: "remove",
            label: "Excluir"
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                let { data: englishBooster, error } = await supabase
                    .from<EnglishBooster>('englishBooster')
                    .select('*');

                if (error) throw error;

                setData(englishBooster?.sort() || []);
            } catch (err) {
                console.log("Um erro ocorreu...", err);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <p>Palavras Salvas:</p>
            {data && data.length > 0 ? (
                <Table className="dark" aria-label="Tabela de palavras salvas">
                    <TableHeader>
                        {tableColumns.map((column) => (
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody>
                        { data.map((word) => (
                            <TableRow key={word.id}>
                                <TableCell>
                                    { word.id }
                                </TableCell>
                                <TableCell>
                                    { word.english_word }
                                </TableCell>
                                <TableCell>
                                    { word.portuguese_meaning }
                                </TableCell>
                                <TableCell>
                                    <img src={editIcon} className="text-white" alt="edit_icon" width={24} height={24} />
                                </TableCell>
                                <TableCell>
                                    <button aria-label={`Remover a palavra ${word.english_word}`} className="bg-red-400 hover:border-red-500" onClick={(ev) => handleRemove(ev, word.id, setData, data)}>
                                        X
                                    </button>
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            ) : (
                <Spinner size="md" color="secondary" />
            )}
        </>
    );
};

export default SavedWordsList;
