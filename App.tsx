import React, { useState, useMemo, useCallback } from 'react';
import { Account, Person, AccountStatus, MonetizationFilter } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import AccountCard from './components/AccountCard';
import FilterControls from './components/FilterControls';
import Modal from './components/Modal';
import AccountForm from './components/AccountForm';
import PersonForm from './components/PersonForm';
import ConfirmDialog from './components/ConfirmDialog';
import { UserPlusIcon, TrashIcon } from './constants';

const App: React.FC = () => {
  const [accounts, setAccounts] = useLocalStorage<Account[]>('tiktokAccounts', []);
  const [people, setPeople] = useLocalStorage<Person[]>('tiktokPeople', []);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);

  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);

  const [filterStatus, setFilterStatus] = useState<AccountStatus | 'all'>('all');
  const [filterMonetized, setFilterMonetized] = useState<MonetizationFilter>('all');
  const [filterPersonId, setFilterPersonId] = useState<string | 'all'>('all');

  const handleOpenAddAccountModal = useCallback(() => {
    setEditingAccount(null);
    setIsAccountModalOpen(true);
  }, []);

  const handleOpenEditAccountModal = useCallback((account: Account) => {
    setEditingAccount(account);
    setIsAccountModalOpen(true);
  }, []);
  
  const handleOpenAddPersonModal = useCallback(() => {
    setIsPersonModalOpen(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setIsAccountModalOpen(false);
    setIsPersonModalOpen(false);
    setEditingAccount(null);
    setAccountToDelete(null);
    setPersonToDelete(null);
  }, []);

  const handleAccountSubmit = useCallback((accountData: Omit<Account, 'id'> | Account) => {
    if ('id' in accountData) {
      setAccounts(prev => prev.map(acc => acc.id === accountData.id ? accountData : acc));
    } else {
      const newAccount: Account = { ...accountData, id: Date.now().toString() };
      setAccounts(prev => [...prev, newAccount]);
    }
    handleCloseModals();
  }, [setAccounts, handleCloseModals]);

  const handlePersonSubmit = useCallback((personData: Pick<Person, 'name'>) => {
    const newPerson: Person = { ...personData, id: Date.now().toString() };
    setPeople(prev => [...prev, newPerson]);
    handleCloseModals();
  }, [setPeople, handleCloseModals]);
  
  const handleDeleteAccount = useCallback((account: Account) => {
    setAccountToDelete(account);
  }, []);

  const confirmDeleteAccount = useCallback(() => {
    if (accountToDelete) {
      setAccounts(prev => prev.filter(acc => acc.id !== accountToDelete.id));
      handleCloseModals();
    }
  }, [accountToDelete, setAccounts, handleCloseModals]);

  const handleDeletePerson = useCallback((person: Person) => {
    setPersonToDelete(person);
  }, []);
  
  const confirmDeletePerson = useCallback(() => {
    if (personToDelete) {
      setAccounts(prevAccounts => 
        prevAccounts.map(acc => 
          acc.responsiblePersonId === personToDelete.id 
            ? { ...acc, responsiblePersonId: undefined } 
            : acc
        )
      );
      setPeople(prev => prev.filter(p => p.id !== personToDelete.id));
      handleCloseModals();
    }
  }, [personToDelete, setAccounts, setPeople, handleCloseModals]);

  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      const statusMatch = filterStatus === 'all' || account.status === filterStatus;
      const monetizedMatch = filterMonetized === 'all' || (filterMonetized === 'yes' && account.monetized) || (filterMonetized === 'no' && !account.monetized);
      const personMatch = filterPersonId === 'all' || account.responsiblePersonId === filterPersonId;
      return statusMatch && monetizedMatch && personMatch;
    });
  }, [accounts, filterStatus, filterMonetized, filterPersonId]);

  return (
    <div className="min-h-screen">
      <Navbar onAddAccount={handleOpenAddAccountModal} onAddPerson={handleOpenAddPersonModal} />
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <FilterControls
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterMonetized={filterMonetized}
          setFilterMonetized={setFilterMonetized}
          filterPersonId={filterPersonId}
          setFilterPersonId={setFilterPersonId}
          people={people}
        />

        {people.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-3">
                <UserPlusIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-200">Equipe</h2>
              <span className="ml-3 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-sm font-semibold">
                {people.length} {people.length === 1 ? 'pessoa' : 'pessoas'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {people.map(person => (
                <div key={person.id} className="glass p-4 rounded-xl shadow-lg flex items-center justify-between border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {person.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-slate-200 text-sm font-medium truncate" title={person.name}>
                      {person.name}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDeletePerson(person)} 
                    className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 focus-ring ml-2 flex-shrink-0"
                    title="Excluir Pessoa"
                  >
                    <TrashIcon className="w-4 h-4"/>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center mr-3">
                <span className="text-white text-lg">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-200">Contas TikTok</h2>
              <span className="ml-3 px-3 py-1 bg-sky-600/20 text-sky-400 rounded-lg text-sm font-semibold">
                {filteredAccounts.length} {filteredAccounts.length === 1 ? 'conta' : 'contas'}
              </span>
            </div>
          </div>
          
          {filteredAccounts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map(account => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  people={people}
                  onEdit={handleOpenEditAccountModal} 
                  onDelete={handleDeleteAccount} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass rounded-2xl border border-slate-700/50">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Nenhuma conta encontrada</h3>
              <p className="text-slate-500 mb-6">Tente ajustar os filtros ou adicione novas contas para começar.</p>
              <button
                onClick={handleOpenAddAccountModal}
                className="btn-animate inline-flex items-center bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus-ring"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Adicionar Primeira Conta
              </button>
            </div>
          )}
        </section>
      </main>

      <Modal isOpen={isAccountModalOpen} onClose={handleCloseModals} title={editingAccount ? 'Editar Conta TikTok' : 'Adicionar Nova Conta TikTok'} size="lg">
        <AccountForm 
          onSubmit={handleAccountSubmit} 
          onClose={handleCloseModals} 
          initialData={editingAccount} 
          people={people} 
        />
      </Modal>

      <Modal isOpen={isPersonModalOpen} onClose={handleCloseModals} title={'Adicionar Nova Pessoa'} size="sm">
        <PersonForm 
          onSubmit={handlePersonSubmit} 
          onClose={handleCloseModals} 
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!accountToDelete}
        onClose={handleCloseModals}
        onConfirm={confirmDeleteAccount}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a conta @${accountToDelete?.username}? Esta ação não pode ser desfeita.`}
      />

      <ConfirmDialog
        isOpen={!!personToDelete}
        onClose={handleCloseModals}
        onConfirm={confirmDeletePerson}
        title="Confirmar Exclusão de Pessoa"
        message={`Tem certeza que deseja excluir ${personToDelete?.name}? Esta pessoa será desassociada de todas as contas.`}
      />
    </div>
  );
};

export default App;