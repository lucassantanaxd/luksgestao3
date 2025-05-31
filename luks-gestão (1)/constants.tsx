
import React from 'react';
import { AccountStatus } from './types';

export const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25V4c.827-.05 1.66-.075 2.5-.075zm-1.75 4.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zm3.5 0a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5z" clipRule="evenodd" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

export const UserPlusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0ZM7.25 9.25A4.25 4.25 0 003 13.5V15h9v-1.5A4.25 4.25 0 007.25 9.25Z" />
    <path d="M14.75 9.25a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5V7.75a.75.75 0 00-1.5 0v1.5h-1.5Z" />
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const RocketLaunchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.13 9.25h9.74a1.5 1.5 0 001.436-1.086l1.414-4.925a.75.75 0 00-.826-.95A24.891 24.891 0 0010 2c-1.763 0-3.47-.174-5.105-.511-1.021-.225-1.683.66-1.79.7zM6.105 12.25a.75.75 0 00-1.06 0l-2.5 2.5a.75.75 0 001.06 1.06l2.5-2.5a.75.75 0 000-1.06zM10 11.25a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zm3.895 1a.75.75 0 00-1.06-1.06l-2.5 2.5a.75.75 0 001.06 1.06l2.5-2.5z" />
  </svg>
);

export const FireIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.213 2.116A.75.75 0 0010.355 2H9.646a.75.75 0 00-.858.115c-.229.17-.416.383-.581.618C7.246 4.02 6.5 5.69 6.5 7.5c0 1.152.223 2.23.624 3.2D7.5 11.583 8.032 12.5 7.5 13.5c-.19.36-.25.785-.185 1.208.064.408.248.78.52 1.076.272.295.62.507 1.002.618.39.114.802.088 1.186-.072.39-.162.72-.428.953-.776.228-.343.353-.743.353-1.154 0-.5-.168-.955-.392-1.333-.237-.405-.237-.912 0-1.317.219-.372.392-.78.392-1.217 0-1.81-.745-3.48-1.707-4.732-.166-.235-.353-.448-.582-.618zM9.645 3.5H10.36a.753.753 0 01.214.028c.15.046.283.128.393.234.796.769 1.379 2.074 1.379 3.238 0 .327-.094.634-.228.904-.13.262-.13.57 0 .833.135.272.228.58.228.903 0 .294-.08.571-.202.818a1.019 1.019 0 01-.54.508 1.048 1.048 0 01-.793.056c-.222-.052-.425-.153-.593-.291a1.038 1.038 0 01-.398-.563c-.052-.202-.043-.418.022-.625.066-.208.19-.398.353-.548.18-.164.18-.436 0-.6-.164-.15-.288-.34-.354-.547a2.745 2.745 0 01-.022-.626c.043-.219.14-.423.288-.593a1.019 1.019 0 01.54-.508A1.047 1.047 0 0110 6.5c.198 0 .389.043.557.118.123.053.193.183.154.309a.753.753 0 01-.309.153.76.76 0 01-.557-.118.268.268 0 00-.145-.036.258.258 0 00-.145.243c0 .18.164.327.327.327.175 0 .328-.147.328-.327 0-1.164-.583-2.469-1.379-3.238a.752.752 0 01-.393-.234.752.752 0 01-.214-.028z" clipRule="evenodd" />
  </svg>
);

export const XCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd" />
  </svg>
);

export const ShoppingBagIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M2.879 7.121A3 3 0 017.5 6h5a3 3 0 012.621 1.121L16 9.5V12.5a.5.5 0 01-1 0V10H5v2.5a.5.5 0 01-1 0V9.5l.879-2.379zM4.5 10.5a.5.5 0 11-1 0 .5.5 0 011 0zM16.5 10.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    <path fillRule="evenodd" d="M5 13a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2zm1.5 1.5a.5.5 0 000-1h5a.5.5 0 000 1h-5z" clipRule="evenodd" />
  </svg>
);

export const BanknotesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.418 0 8-3.134 8-7H1.75v5.5zM2 19.25A.75.75 0 002.75 20H10v-5.5c0-1.55.264-3.05.75-4.433V19.25H2z" clipRule="evenodd" />
  </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5Z" />
    <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0Z" clipRule="evenodd" />
  </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M2 6a2 2 0 012-2h1.6a2 2 0 001.71-.98l.16-.31A2 2 0 019.47 2h1.06a2 2 0 011.71.71l.16.31a2 2 0 001.71.98H16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 5a3 3 0 106 0 3 3 0 00-6 0z" />
  </svg>
);


export interface StatusConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
}

export const ACCOUNT_STATUS_CONFIG: Record<AccountStatus, StatusConfig> = {
  [AccountStatus.Ativas]: {
    label: 'Conta Ativa',
    color: 'bg-green-600',
    icon: <CheckCircleIcon className="w-4 h-4 mr-1.5" />,
  },
  [AccountStatus.ProntasParaPostar]: {
    label: 'Conta para Postar',
    color: 'bg-sky-500',
    icon: <RocketLaunchIcon className="w-4 h-4 mr-1.5" />,
  },
  [AccountStatus.Aquecendo]: {
    label: 'Conta Aquecendo',
    color: 'bg-amber-500',
    icon: <FireIcon className="w-4 h-4 mr-1.5" />,
  },
  [AccountStatus.Ruins]: {
    label: 'Conta Ruim',
    color: 'bg-red-600',
    icon: <XCircleIcon className="w-4 h-4 mr-1.5" />,
  },
};

export const ACCOUNT_STATUS_OPTIONS = Object.entries(ACCOUNT_STATUS_CONFIG).map(([value, config]) => ({
  value: value as AccountStatus,
  label: config.label,
}));
