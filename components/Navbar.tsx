import React from 'react';
import { PlusIcon, UserPlusIcon } from '../constants';

interface NavbarProps {
  onAddAccount: () => void;
  onAddPerson: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddAccount, onAddPerson }) => {
  return (
    <nav className="glass sticky top-0 z-40 border-b border-slate-700/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl float">
                🎯
              </div>
              <div>
                <h1 className="font-bold text-2xl text-gradient">LUKS GESTÃO</h1>
                <p className="text-xs text-slate-400 font-medium">Gerenciamento de Contas TikTok</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onAddPerson}
              className="btn-animate flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-5 rounded-xl shadow-glow-purple transition-all duration-300 hover:shadow-lg hover:scale-105 focus-ring"
            >
              <UserPlusIcon className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Adicionar Pessoa</span>
              <span className="sm:hidden">Pessoa</span>
            </button>
            <button
              onClick={onAddAccount}
              className="btn-animate flex items-center bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-medium py-3 px-5 rounded-xl shadow-glow transition-all duration-300 hover:shadow-lg hover:scale-105 focus-ring"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Adicionar Conta</span>
              <span className="sm:hidden">Conta</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;