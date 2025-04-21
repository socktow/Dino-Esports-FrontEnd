'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [formError, setFormError] = useState('');
  const { login, register, error, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    try {
      let result;
      
      if (isLogin) {
        result = await login(formData.username, formData.password);
      } else {
        if (!formData.email) {
          setFormError(t('auth.emailRequired'));
          return;
        }
        result = await register(formData.username, formData.email, formData.password);
      }
      
      if (result.success) {
        router.push('/');
      }
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/90 rounded-xl p-8 w-full max-w-md relative border border-gray-700 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-2 shadow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {isLogin ? 'L' : 'S'}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="bg-gray-800 rounded-full p-1 shadow-inner">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {t('common.login')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                  : 'text-gray-400 hover:bg-gray-700'
              }`}
            >
              {t('common.signup')}
            </button>
          </div>
        </div>

        {(error || formError) && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
            {error || formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 bg-gray-800 text-xs font-medium text-blue-300">
              {t('common.username')}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 px-1 bg-gray-800 text-xs font-medium text-blue-300">
              {t('common.password')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1 bg-gray-800 text-xs font-medium text-blue-300">
                {t('common.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? t('common.processing') : (isLogin ? t('common.login') : t('common.signup'))}
          </button>
        </form>
      </div>
    </div>
  );
} 