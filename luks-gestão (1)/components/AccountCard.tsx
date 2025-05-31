
import React from 'react';
import { Account, Person } from '../types';
import { ACCOUNT_STATUS_CONFIG, EditIcon, TrashIcon, ShoppingBagIcon, BanknotesIcon, EyeIcon } from '../constants'; // CameraIcon removed from imports if not used elsewhere

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
    <div className="bg-slate-800 shadow-lg rounded-lg p-5 flex flex-col justify-between transition-all hover:shadow-sky-500/30 border border-slate-700 hover:border-slate-600">
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center flex-grow min-w-0"> {/* Added flex-grow and min-w-0 for better wrapping with logo */}
            {account.logo && (
              <img 
                src={account.logo} 
                alt={`Logo de @${account.username}`} 
                className="w-10 h-10 rounded-full mr-3 object-cover border border-slate-600 flex-shrink-0" // Added flex-shrink-0
              />
            )}
            <h3 className="text-xl font-semibold text-sky-400 break-all truncate">@{account.username}</h3>
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white flex items-center ${statusConfig.color} self-start ml-2 flex-shrink-0`}> {/* Added ml-2 and flex-shrink-0 */}
            {statusConfig.icon}
            {statusConfig.label}
          </span>
        </div>
        <p className="text-sm text-slate-400 mb-1 truncate" title={account.email}>
          <span className="font-medium text-slate-300">Email:</span> {account.email}
        </p>
        {responsiblePerson && (
          <p className="text-sm text-slate-400 mb-1">
            <span className="font-medium text-slate-300">Responsável:</span> {responsiblePerson.name}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          {account.monetized && (
            <span className="flex items-center text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-full">
              <BanknotesIcon className="w-4 h-4 mr-1.5" /> Monetizada
            </span>
          )}
          {account.tiktokShopLinked && (
            <span className="flex items-center text-xs bg-purple-600 text-white px-2.5 py-1 rounded-full">
              <ShoppingBagIcon className="w-4 h-4 mr-1.5" /> TikTok Shop
            </span>
          )}
          {/* Removed photos count badge */}
        </div>
      </div>
      <div className="mt-5 flex justify-end space-x-2 border-t border-slate-700 pt-4">
         <a 
          href={`https://www.tiktok.com/@${account.username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
          title="Ver no TikTok"
          aria-label={`Ver perfil de @${account.username} no TikTok`}
        >
          <EyeIcon className="w-5 h-5" />
        </a>
        <button
          onClick={() => onEdit(account)}
          className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
          title="Editar Conta"
          aria-label={`Editar conta @${account.username}`}
        >
          <EditIcon />
        </button>
        <button
          onClick={() => onDelete(account)}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
          title="Excluir Conta"
          aria-label={`Excluir conta @${account.username}`}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;