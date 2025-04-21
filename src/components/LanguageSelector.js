'use client';
import { useLanguage } from '../context/LanguageContext';

const languages = {
  'vi-VN': 'Tiếng Việt',
  'en-US': 'English',
  'ko-KR': '한국어',
  'zh-CN': '中文'
};

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="fixed top-4 left-4">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
} 