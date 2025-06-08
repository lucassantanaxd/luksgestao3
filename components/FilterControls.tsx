import React from 'react';
import { AccountStatus, Person, MonetizationFilter } from '../types';
import { ACCOUNT_STATUS_OPTIONS } from '../constants';

interface FilterControlsProps {
  filterStatus: AccountStatus | 'all';
  setFilterStatus: (status: AccountStatus | 'all') => void;
  filterMonetized: MonetizationFilter;
  setFilterMonetized: (monetized: MonetizationFilter) => void;
  filterPersonId: string | 'all';
  setFilterPersonId: (personId: string | 'all') => void;
  people: Person[];
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filterStatus,
  setFilterStatus,
  filterMonetized,
  setFilterMonetized,
  filterPersonId,
  setFilterPersonId,
  people,
}) => {
  const commonSelectClass = "glass text-slate-200 text-sm rounded-xl focus:ring-sky-500 focus:border-sky-500 block w-full p-4 placeholder-slate-400 border border-slate-600/50 hover:border-slate-500 transition-all duration-300 focus-ring";

  return (
    <div className="glass rounded-2xl p-6 mb-8 border border-slate-700/50">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-200">Filtros de Busca</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="statusFilter" className="block text-sm font-semibold text-slate-300">
            Status da Conta
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as AccountStatus | 'all')}
            className={commonSelectClass}
          >
            <option value="all">🔍 Todos os Status</option>
            {ACCOUNT_STATUS_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="monetizedFilter" className="block text-sm font-semibold text-slate-300">
            Monetização
          </label>
          <select
            id="monetizedFilter"
            value={filterMonetized}
            onChange={(e) => setFilterMonetized(e.target.value as MonetizationFilter)}
            className={commonSelectClass}
          >
            <option value="all">💰 Todas as Contas</option>
            <option value="yes">✅ Monetizadas</option>
            <option value="no">❌ Não Monetizadas</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="personFilter" className="block text-sm font-semibold text-slate-300">
            Responsável
          </label>
          <select
            id="personFilter"
            value={filterPersonId}
            onChange={(e) => setFilterPersonId(e.target.value)}
            className={commonSelectClass}
          >
            <option value="all">👥 Todas as Pessoas</option>
            {people.map(person => (
              <option key={person.id} value={person.id}>👤 {person.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;