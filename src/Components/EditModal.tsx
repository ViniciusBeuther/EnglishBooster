import React, { useEffect, useState } from 'react';
import Button from './Button';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: any | any;
  onSave: (updatedWord: any) => void;
  setIsOpen: any;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, word, onSave, setIsOpen }) => {
  const [englishWord, setEnglishWord] = useState(word?.english_word || '');
  const [portugueseMeaning, setPortugueseMeaning] = useState(word?.portuguese_meaning || '');

  useEffect(() => {
    if (word) {
      setEnglishWord(word.english_word);
      setPortugueseMeaning(word.portuguese_meaning);
    }
  }, [word]);

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSave = () => {
    if (word) {
      onSave({
        ...word,
        english_word: englishWord,
        portuguese_meaning: portugueseMeaning,
      });
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dark fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-[#1a1a1a] p-8 rounded-md shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bolder mb-4 text-white">Editar Palavra</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Palavra em Inglês</label>
          <input
            type="text"
            value={englishWord}
            onChange={(e) => setEnglishWord(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder={`${word?.english_word}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Significado em Português</label>
          <input
            type="text"
            value={portugueseMeaning}
            onChange={(e) => setPortugueseMeaning(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder={`${word?.portuguese_meaning}`}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:border-none border-none"
          >
            Cancelar
          </button>

          <Button text={"Salvar"} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default EditModal;
