
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
  const commonSelectClass = "bg-slate-700 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 placeholder-slate-400";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-800 rounded-lg shadow">
      <div>
        <label htmlFor="statusFilter" className="block mb-2 text-sm font-medium text-slate-300">Filtrar por Status</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as AccountStatus | 'all')}
          className={commonSelectClass}
        >
          <option value="all">Todos os Status</option>
          {ACCOUNT_STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="monetizedFilter" className="block mb-2 text-sm font-medium text-slate-300">Filtrar por Monetização</label>
        <select
          id="monetizedFilter"
          value={filterMonetized}
          onChange={(e) => setFilterMonetized(e.target.value as MonetizationFilter)}
          className={commonSelectClass}
        >
          <option value="all">Todas</option>
          <option value="yes">Monetizadas</option>
          <option value="no">Não Monetizadas</option>
        </select>
      </div>
      <div>
        <label htmlFor="personFilter" className="block mb-2 text-sm font-medium text-slate-300">Filtrar por Responsável</label>
        <select
          id="personFilter"
          value={filterPersonId}
          onChange={(e) => setFilterPersonId(e.target.value)}
          className={commonSelectClass}
        >
          <option value="all">Todas as Pessoas</option>
          {people.map(person => (
            <option key={person.id} value={person.id}>{person.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
