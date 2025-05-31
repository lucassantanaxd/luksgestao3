
import React, { useState, useEffect } from 'react';
import { Person } from '../types';

interface PersonFormProps {
  onSubmit: (personData: Pick<Person, 'name'>) => void;
  onClose: () => void;
  initialData?: Person | null;
}

const PersonForm: React.FC<PersonFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      // Basic validation, can be expanded
      alert("O nome da pessoa não pode estar vazio.");
      return;
    }
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="personName" className="block text-sm font-medium text-slate-300 mb-1">
          Nome da Pessoa
        </label>
        <input
          type="text"
          id="personName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400"
          placeholder="Ex: João Silva"
          required
        />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md text-slate-300 bg-slate-600 hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {initialData ? 'Atualizar Pessoa' : 'Adicionar Pessoa'}
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
