import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Table, TableColumn, TableHeader, TableBody, TableRow, TableCell, Spinner, table } from "@nextui-org/react";
import EditModal from "./EditModal";
import editIcon from "/edit.svg";

interface EnglishBooster {
  id: number;
  english_word: string;
  portuguese_meaning: string;
}

interface TableColumnsTypes {
  key: string;
  label: string;
}

const handleRemove = async (
  ev: any,
  wordId: Number,
  setData: any,
  data: EnglishBooster[]
) => {
  ev.preventDefault();

  try {
    const { error } = await supabase
      .from("englishBooster")
      .delete()
      .eq("id", `${wordId}`);
    setData(data.filter((word) => word.id !== wordId));
  } catch (error) {
    return console.log("error");
  }
};

const SavedWordsList = () => {
  const [data, setData] = useState<EnglishBooster[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumnsTypes[]>([
    {
      key: "id",
      label: "ID",
    },
    {
      key: "english_word",
      label: "Palavra",
    },
    {
      key: "portuguese_meaning",
      label: "Significado",
    },
    {
      key: "edit",
      label: "Editar",
    },
    {
      key: "remove",
      label: "Excluir",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<EnglishBooster | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      try {
        let { data: englishBooster, error } = await supabase
          .from<EnglishBooster>("englishBooster")
          .select("*");

        if (error) throw error;

        setData(englishBooster?.sort() || []);
      } catch (err) {
        console.log("Um erro ocorreu...", err);
      }
    }

    fetchData();
  }, []);

  const handleEdit = (word: EnglishBooster) => {
    setSelectedWord(word);
    setIsOpen(true);
  };

  const handleSave = async (updatedWord: EnglishBooster) => {
    try {
      const { error } = await supabase
        .from("englishBooster")
        .update(updatedWord)
        .eq("id", updatedWord.id);

      if (error) throw error;

      setData(
        data.map((word) => (word.id === updatedWord.id ? updatedWord : word))
      );
    } catch (error) {
      console.log("Um erro ocorreu...", error);
    }
  };

  const handleClose = (ev: any) => {
    ev.preventDefault();
    setIsOpen(false);
    setSelectedWord(null);
};

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
            {data.map((word) => (
              <TableRow key={word.id}>
                <TableCell>{word.id}</TableCell>
                <TableCell>{word.english_word}</TableCell>
                <TableCell>{word.portuguese_meaning}</TableCell>
                <TableCell>
                  <button onClick={() => handleEdit(word)}>
                    <img
                      src={editIcon}
                      className="text-white"
                      alt="edit_icon"
                      width={24}
                      height={24}
                    />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    aria-label={`Remover a palavra ${word.english_word}`}
                    className="bg-red-400 hover:border-red-500"
                    onClick={(ev) =>
                      handleRemove(ev, word.id, setData, data)
                    }
                  >
                    X
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Spinner size="md" color="secondary" />
      )}
      <EditModal
        isOpen={isOpen}
        onClose={(ev:any) => handleClose(ev)}
        word={selectedWord}
        onSave={handleSave}
      />
    </>
  );
};

export default SavedWordsList;
