import React from 'react';
import { ProductStatus } from '../types';
import { Language, statusTranslations } from '../locales';

interface StatusPillProps {
  status: ProductStatus;
  language: Language;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, language }) => {
  const isSoldOut = status === ProductStatus.SoldOut;

  const baseClasses = 'w-28 text-center py-2 px-3 rounded-full text-base font-bold shadow-sm transition-transform transform hover:scale-105 border';
  
  const statusClasses = isSoldOut
    ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500/30'
    : 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500/30';

  return (
    <div className={`${baseClasses} ${statusClasses} transition-colors duration-300`}>
      {statusTranslations[status][language]}
    </div>
  );
};