
import React, { useState, useEffect } from 'react';
import { Account, AccountStatus, Person } from '../types';
import { ACCOUNT_STATUS_OPTIONS } from '../constants';

interface AccountFormProps {
  onSubmit: (accountData: Omit<Account, 'id'> | Account) => void;
  onClose: () => void;
  initialData?: Account | null;
  people: Person[];
}

const AccountForm: React.FC<AccountFormProps> = ({ onSubmit, onClose, initialData, people }) => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<AccountStatus>(AccountStatus.Ativas);
  const [monetized, setMonetized] = useState(false);
  const [tiktokShopLinked, setTiktokShopLinked] = useState(false);
  const [email, setEmail] = useState('');
  const [responsiblePersonId, setResponsiblePersonId] = useState<string | undefined>(undefined);
  const [currentLogo, setCurrentLogo] = useState<string>('');
  const [logoFileName, setLogoFileName] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setStatus(initialData.status);
      setMonetized(initialData.monetized);
      setTiktokShopLinked(initialData.tiktokShopLinked);
      setEmail(initialData.email);
      setResponsiblePersonId(initialData.responsiblePersonId || '');
      setCurrentLogo(initialData.logo || '');
      setLogoFileName(initialData.logo ? 'Logo carregada' : '');
    } else {
      setUsername('');
      setStatus(AccountStatus.Ativas);
      setMonetized(false);
      setTiktokShopLinked(false);
      setEmail('');
      setResponsiblePersonId('');
      setCurrentLogo('');
      setLogoFileName('');
    }
  }, [initialData]);

  const handleLogoSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCurrentLogo(reader.result as string);
          setLogoFileName(file.name);
        };
        reader.onerror = (error) => {
          console.error("Erro ao ler arquivo:", error);
          alert("Erro ao ler arquivo de imagem.");
          setLogoFileName('');
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Arquivo '${file.name}' não é uma imagem válida.`);
        setLogoFileName('');
      }
    } else {
        // If no file is chosen (e.g. user cancels dialog), we might want to clear filename
        // but only if there wasn't a logo before, or handle based on currentLogo state.
        // For simplicity, if they cancel, we don't change existing logo/filename unless removeLogo is called.
        // If they had no logo, and cancel, filename remains empty.
    }
    // Clear the file input so the same file can be selected again if removed and re-added
    event.target.value = '';
  };

  const removeLogo = () => {
    setCurrentLogo('');
    setLogoFileName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
        alert("Nome de usuário e e-mail são obrigatórios.");
        return;
    }
    const accountData = {
      username,
      status,
      monetized,
      tiktokShopLinked,
      email,
      responsiblePersonId: responsiblePersonId || undefined,
      logo: currentLogo,
    };
    if (initialData) {
      onSubmit({ ...initialData, ...accountData });
    } else {
      onSubmit(accountData);
    }
  };
  
  const commonInputClass = "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-slate-100 placeholder-slate-400";
  const commonLabelClass = "block text-sm font-medium text-slate-300 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className={commonLabelClass}>Nome de Usuário TikTok</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={commonInputClass} placeholder="@usuario" required />
      </div>
      <div>
        <label htmlFor="email" className={commonLabelClass}>E-mail Vinculado</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={commonInputClass} placeholder="email@exemplo.com" required />
      </div>
      <div>
        <label htmlFor="status" className={commonLabelClass}>Status da Conta</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value as AccountStatus)} className={commonInputClass}>
          {ACCOUNT_STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="responsiblePerson" className={commonLabelClass}>Pessoa Responsável</label>
        <select id="responsiblePerson" value={responsiblePersonId || ''} onChange={(e) => setResponsiblePersonId(e.target.value || undefined)} className={commonInputClass}>
          <option value="">Ninguém atribuído</option>
          {people.map(person => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={commonLabelClass}>Logo da Conta</label>
        <div className="flex items-center space-x-3">
          <label 
            htmlFor="logoFileInput" 
            className="cursor-pointer px-3 py-2 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors whitespace-nowrap"
            role="button"
            aria-controls="logoFileInput"
          >
            {currentLogo ? 'Alterar Logo' : 'Selecionar Logo'}
          </label>
          <input
            type="file"
            id="logoFileInput"
            accept="image/*"
            onChange={handleLogoSelection}
            className="hidden"
          />
          <span className="text-sm text-slate-400 truncate" title={logoFileName || "Nenhum arquivo selecionado"}>
            {logoFileName || "Nenhum arquivo selecionado"}
          </span>
        </div>
        
        {currentLogo && (
          <div className="mt-3 relative group w-32 h-32">
            <img src={currentLogo} alt="Logo preview" className="w-full h-full object-cover rounded-md border border-slate-600" />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-400 hover:bg-red-700"
              aria-label="Remover logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4 pt-2">
        <div className="flex items-center">
          <input id="monetized" type="checkbox" checked={monetized} onChange={(e) => setMonetized(e.target.checked)} className="h-4 w-4 text-sky-600 border-slate-500 rounded focus:ring-sky-500 bg-slate-700" />
          <label htmlFor="monetized" className="ml-2 text-sm text-slate-300">Monetizada?</label>
        </div>
        <div className="flex items-center">
          <input id="tiktokShopLinked" type="checkbox" checked={tiktokShopLinked} onChange={(e) => setTiktokShopLinked(e.target.checked)} className="h-4 w-4 text-sky-600 border-slate-500 rounded focus:ring-sky-500 bg-slate-700" />
          <label htmlFor="tiktokShopLinked" className="ml-2 text-sm text-slate-300">TikTok Shop Vinculado?</label>
        </div>
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700 mt-2">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-slate-300 bg-slate-600 hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 rounded-md text-white bg-sky-600 hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500">
          {initialData ? 'Atualizar Conta' : 'Adicionar Conta'}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
