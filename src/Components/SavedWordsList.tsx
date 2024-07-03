import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { Table, TableColumn, TableHeader, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import editIcon from "/edit.svg";
import "../styles/customSwal.css"

interface EnglishBooster {
  id: number;
  english_word: string;
  portuguese_meaning: string;
}

interface TableColumnsTypes {
  key: string;
  label: string;
}

const MySwal = withReactContent(Swal);

const handleRemove = async (
  ev: any,
  wordId: number,
  setData: (data: EnglishBooster[]) => void,
  data: EnglishBooster[]
) => {
  ev.preventDefault();

  try {
    const { error } = await supabase
      .from("englishBooster")
      .delete()
      .eq("id", wordId);
    if (error) throw error;
    setData(data.filter((word) => word.id !== wordId));
  } catch (error) {
    console.log("error", error);
  }
};

const SavedWordsList = () => {
  const [data, setData] = useState<EnglishBooster[]>([]);
  const [tableColumns] = useState<TableColumnsTypes[]>([
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
    MySwal.fire({
      title: 'Editar Palavra',
      html: `
        <label class="modal__label">Palavra em Inglês</label>
        <input type="text" id="english_word" class="swal2-input modal__input" value="${word.english_word}" />
        <br>
        <label class="modal__label">Significado em Português</label>
        <input type="text" id="portuguese_meaning" class="swal2-input modal__input" value="${word.portuguese_meaning}" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      customClass: {
        container: 'custom-swal-container',
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        closeButton: 'custom-swal-close-button',
        icon: 'custom-swal-icon',
        image: 'custom-swal-image',
        input: 'custom-swal-input',
        actions: 'custom-swal-actions',
        confirmButton: 'custom-swal-confirm-button',
        cancelButton: 'custom-swal-cancel-button',
        footer: 'custom-swal-footer'
      },
      preConfirm: () => {
        const englishWord = (document.getElementById('english_word') as HTMLInputElement).value;
        const portugueseMeaning = (document.getElementById('portuguese_meaning') as HTMLInputElement).value;
        return { ...word, english_word: englishWord, portuguese_meaning: portugueseMeaning };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave(result.value);
      }
    });
    
  };

  const handleSave = async (updatedWord: EnglishBooster) => {
    try {
      const { error } = await supabase
        .from("englishBooster")
        .update({
          english_word: updatedWord.english_word,
          portuguese_meaning: updatedWord.portuguese_meaning
        })
        .eq("id", updatedWord.id);

      if (error) throw error;

      setData(
        data.map((word) => (word.id === updatedWord.id ? updatedWord : word))
      );
      MySwal.fire('Salvo!', 'A palavra foi atualizada com sucesso.', 'success');
    } catch (error) {
      MySwal.fire('Erro!', 'Ocorreu um erro ao atualizar a palavra.', 'error');
      console.log("Um erro ocorreu...", error);
    }
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
                    onClick={(ev) => handleRemove(ev, word.id, setData, data)}
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
    </>
  );
};

export default SavedWordsList;
