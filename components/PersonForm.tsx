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
      alert("O nome da pessoa não pode estar vazio.");
      return;
    }
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="personName" className="block text-sm font-semibold text-slate-300 mb-2">
          <span className="flex items-center">
            <span className="mr-2">👤</span>
            Nome da Pessoa
          </span>
        </label>
        <input
          type="text"
          id="personName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 glass border border-slate-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 transition-all duration-300 hover:border-slate-500"
          placeholder="Ex: João Silva"
          required
        />
        <p className="mt-2 text-xs text-slate-500">
          Esta pessoa poderá ser atribuída como responsável por contas TikTok.
        </p>
      </div>
      
      <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700/50">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 transition-all duration-300 focus-ring font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-animate px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 focus-ring font-medium shadow-lg hover:shadow-xl"
        >
          {initialData ? '✅ Atualizar Pessoa' : '➕ Adicionar Pessoa'}
        </button>
      </div>
    </form>
  );
};

export default PersonForm;