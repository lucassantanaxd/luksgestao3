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
    }
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
  
  const commonInputClass = "w-full px-4 py-3 glass border border-slate-600/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100 placeholder-slate-400 transition-all duration-300 hover:border-slate-500";
  const commonLabelClass = "block text-sm font-semibold text-slate-300 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="username" className={commonLabelClass}>
            <span className="flex items-center">
              <span className="mr-2">📱</span>
              Nome de Usuário TikTok
            </span>
          </label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className={commonInputClass} 
            placeholder="@usuario" 
            required 
          />
        </div>
        
        <div>
          <label htmlFor="email" className={commonLabelClass}>
            <span className="flex items-center">
              <span className="mr-2">📧</span>
              E-mail Vinculado
            </span>
          </label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={commonInputClass} 
            placeholder="email@exemplo.com" 
            required 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="status" className={commonLabelClass}>
            <span className="flex items-center">
              <span className="mr-2">📊</span>
              Status da Conta
            </span>
          </label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value as AccountStatus)} 
            className={commonInputClass}
          >
            {ACCOUNT_STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="responsiblePerson" className={commonLabelClass}>
            <span className="flex items-center">
              <span className="mr-2">👤</span>
              Pessoa Responsável
            </span>
          </label>
          <select 
            id="responsiblePerson" 
            value={responsiblePersonId || ''} 
            onChange={(e) => setResponsiblePersonId(e.target.value || undefined)} 
            className={commonInputClass}
          >
            <option value="">Ninguém atribuído</option>
            {people.map(person => (
              <option key={person.id} value={person.id}>{person.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={commonLabelClass}>
          <span className="flex items-center">
            <span className="mr-2">🖼️</span>
            Logo da Conta
          </span>
        </label>
        <div className="flex items-center space-x-4">
          <label 
            htmlFor="logoFileInput" 
            className="btn-animate cursor-pointer px-6 py-3 text-sm bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl focus-ring"
            role="button"
            aria-controls="logoFileInput"
          >
            {currentLogo ? '🔄 Alterar Logo' : '📁 Selecionar Logo'}
          </label>
          <input
            type="file"
            id="logoFileInput"
            accept="image/*"
            onChange={handleLogoSelection}
            className="hidden"
          />
          <span className="text-sm text-slate-400 truncate flex-1" title={logoFileName || "Nenhum arquivo selecionado"}>
            {logoFileName || "Nenhum arquivo selecionado"}
          </span>
        </div>
        
        {currentLogo && (
          <div className="mt-4 relative group w-32 h-32">
            <img 
              src={currentLogo} 
              alt="Logo preview" 
              className="w-full h-full object-cover rounded-xl border-2 border-slate-600 group-hover:border-sky-400 transition-colors duration-300" 
            />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300 focus-ring shadow-lg"
              aria-label="Remover logo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="glass rounded-xl p-4 border border-slate-600/50">
        <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
          <span className="mr-2">⚙️</span>
          Configurações Adicionais
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-300 cursor-pointer">
            <input 
              id="monetized" 
              type="checkbox" 
              checked={monetized} 
              onChange={(e) => setMonetized(e.target.checked)} 
              className="h-5 w-5 text-sky-600 border-slate-500 rounded focus:ring-sky-500 bg-slate-700 mr-3" 
            />
            <div>
              <span className="text-sm font-medium text-slate-300">💰 Monetizada</span>
              <p className="text-xs text-slate-500">Conta gera receita</p>
            </div>
          </label>
          
          <label className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 transition-colors duration-300 cursor-pointer">
            <input 
              id="tiktokShopLinked" 
              type="checkbox" 
              checked={tiktokShopLinked} 
              onChange={(e) => setTiktokShopLinked(e.target.checked)} 
              className="h-5 w-5 text-sky-600 border-slate-500 rounded focus:ring-sky-500 bg-slate-700 mr-3" 
            />
            <div>
              <span className="text-sm font-medium text-slate-300">🛍️ TikTok Shop</span>
              <p className="text-xs text-slate-500">Loja vinculada</p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700/50">
        <button 
          type="button" 
          onClick={onClose} 
          className="px-6 py-3 rounded-xl text-slate-300 bg-slate-700 hover:bg-slate-600 transition-all duration-300 focus-ring font-medium"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn-animate px-6 py-3 rounded-xl text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 transition-all duration-300 focus-ring font-medium shadow-lg hover:shadow-xl"
        >
          {initialData ? '✅ Atualizar Conta' : '➕ Adicionar Conta'}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;