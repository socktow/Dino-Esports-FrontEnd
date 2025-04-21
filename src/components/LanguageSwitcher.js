'use client';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-2 py-1 rounded ${
          currentLanguage === 'vi' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        onClick={() => changeLanguage('vi')}
      >
        Tiếng Việt
      </button>
      <button
        className={`px-2 py-1 rounded ${
          currentLanguage === 'en' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
    </div>
  );
} 