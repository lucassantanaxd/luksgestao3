
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
  // Editing person is not implemented, but could be added similarly to accounts
  // const [editingPerson, setEditingPerson] = useState<Person | null>(null); 

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
    // setEditingPerson(null); // if editing person implemented
    setIsPersonModalOpen(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setIsAccountModalOpen(false);
    setIsPersonModalOpen(false);
    setEditingAccount(null);
    // setEditingPerson(null);
    setAccountToDelete(null);
    setPersonToDelete(null);
  }, []);

  const handleAccountSubmit = useCallback((accountData: Omit<Account, 'id'> | Account) => {
    if ('id' in accountData) { // Editing existing account
      setAccounts(prev => prev.map(acc => acc.id === accountData.id ? accountData : acc));
    } else { // Adding new account
      const newAccount: Account = { ...accountData, id: Date.now().toString() };
      setAccounts(prev => [...prev, newAccount]);
    }
    handleCloseModals();
  }, [setAccounts, handleCloseModals]);

  const handlePersonSubmit = useCallback((personData: Pick<Person, 'name'>) => {
    // For now, only adding new people. Editing could be added.
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
      // Also remove this person as responsible from any accounts
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
    <div className="min-h-screen bg-slate-900">
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
            <h2 className="text-2xl font-semibold text-sky-400 mb-4">Equipe</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {people.map(person => (
                <div key={person.id} className="bg-slate-800 p-3 rounded-lg shadow flex items-center justify-between border border-slate-700">
                  <span className="text-slate-200 text-sm truncate">{person.name}</span>
                  <button 
                    onClick={() => handleDeletePerson(person)} 
                    className="text-slate-500 hover:text-red-500 transition-colors"
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
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">Contas TikTok ({filteredAccounts.length})</h2>
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
            <div className="text-center py-10 bg-slate-800 rounded-lg shadow">
              <p className="text-slate-400 text-lg">Nenhuma conta encontrada.</p>
              <p className="text-slate-500 mt-2">Tente ajustar os filtros ou adicione novas contas.</p>
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
          // initialData={editingPerson} // if editing implemented
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
