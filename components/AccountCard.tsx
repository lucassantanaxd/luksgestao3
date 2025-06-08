import React from 'react';
import { Account, Person } from '../types';
import { ACCOUNT_STATUS_CONFIG, EditIcon, TrashIcon, ShoppingBagIcon, BanknotesIcon, EyeIcon } from '../constants';

interface AccountCardProps {
  account: Account;
  people: Person[];
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({ account, people, onEdit, onDelete }) => {
  const statusConfig = ACCOUNT_STATUS_CONFIG[account.status];
  const responsiblePerson = people.find(p => p.id === account.responsiblePersonId);

  return (
    <div className="glass rounded-2xl p-6 card-hover border border-slate-700/50 group">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center flex-grow min-w-0">
            {account.logo && (
              <div className="relative">
                <img 
                  src={account.logo} 
                  alt={`Logo de @${account.username}`} 
                  className="w-12 h-12 rounded-xl mr-4 object-cover border-2 border-slate-600 group-hover:border-sky-400 transition-colors duration-300 flex-shrink-0" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-bold text-sky-400 group-hover:text-sky-300 transition-colors duration-300 truncate">
                @{account.username}
              </h3>
              <p className="text-sm text-slate-500 font-medium">TikTok Account</p>
            </div>
          </div>
          <span className={`status-badge px-3 py-2 text-xs font-bold rounded-xl text-white flex items-center ${statusConfig.color} ml-3 flex-shrink-0 pulse-glow`}>
            {statusConfig.icon}
            <span className="hidden sm:inline ml-1">{statusConfig.label}</span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">Email:</span>
            </p>
            <p className="text-sm text-slate-200 truncate font-medium" title={account.email}>
              {account.email}
            </p>
          </div>

          {responsiblePerson && (
            <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30">
              <p className="text-sm text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Responsável:</span>
              </p>
              <p className="text-sm text-slate-200 font-medium">{responsiblePerson.name}</p>
            </div>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {account.monetized && (
              <span className="flex items-center text-xs bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-3 py-2 rounded-lg font-semibold shadow-lg">
                <BanknotesIcon className="w-4 h-4 mr-1.5" /> 
                Monetizada
              </span>
            )}
            {account.tiktokShopLinked && (
              <span className="flex items-center text-xs bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-2 rounded-lg font-semibold shadow-lg">
                <ShoppingBagIcon className="w-4 h-4 mr-1.5" /> 
                TikTok Shop
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-2 pt-4 border-t border-slate-700/50">
          <a 
            href={`https://www.tiktok.com/@${account.username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 text-slate-400 hover:text-sky-400 hover:bg-sky-400/10 rounded-xl transition-all duration-300 focus-ring group/btn"
            title="Ver no TikTok"
            aria-label={`Ver perfil de @${account.username} no TikTok`}
          >
            <EyeIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
          </a>
          <button
            onClick={() => onEdit(account)}
            className="p-3 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-all duration-300 focus-ring group/btn"
            title="Editar Conta"
            aria-label={`Editar conta @${account.username}`}
          >
            <EditIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
          </button>
          <button
            onClick={() => onDelete(account)}
            className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 focus-ring group/btn"
            title="Excluir Conta"
            aria-label={`Excluir conta @${account.username}`}
          >
            <TrashIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;