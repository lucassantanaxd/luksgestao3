
import React from 'react';
import { PlusIcon, UserPlusIcon } from '../constants';

interface NavbarProps {
  onAddAccount: () => void;
  onAddPerson: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddAccount, onAddPerson }) => {
  return (
    <nav className="bg-slate-800 shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-sky-400">🎯 LUKS GESTÃO</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddPerson}
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
              <UserPlusIcon className="w-5 h-5 mr-2" />
              Adicionar Pessoa
            </button>
            <button
              onClick={onAddAccount}
              className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Adicionar Conta
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;