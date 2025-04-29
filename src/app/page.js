'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { user, token } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigate = (path) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    if (path.startsWith('/theme/') && token) {
      router.push(`${path}?token=${token}`);
    } else {
      router.push(path);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/image/ahri.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              {t('home.subtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Theme Explorer Card */}
            <div 
              onClick={() => handleNavigate('/theme')}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-0.5 transition-all duration-300 hover:from-blue-500/20 hover:to-purple-500/20 cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900 opacity-90 p-6 flex flex-col min-h-[220px]">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                  {t('home.exploreThemes.title')}
                </h2>
                <p className="text-gray-400 text-sm mt-3 flex-1">
                  {t('home.exploreThemes.description')}
                </p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors mt-4 text-sm">
                  {t('home.exploreThemes.button')}
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dashboard Card */}
            <div 
              onClick={() => handleNavigate('/dashboard')}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-0.5 transition-all duration-300 hover:from-purple-500/20 hover:to-pink-500/20 cursor-pointer h-full"
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900 opacity-90 p-6 flex flex-col min-h-[220px]">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                  {t('home.dashboard.title')}
                </h2>
                <p className="text-gray-400 text-sm mt-3 flex-1">
                  {t('home.dashboard.description')}
                </p>
                <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors mt-4 text-sm">
                  {t('home.dashboard.button')}
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">4</div>
              <div className="text-gray-400 mt-2">{t('home.stats.themes')}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">50K+</div>
              <div className="text-gray-400 mt-2">{t('home.stats.users')}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">4</div>
              <div className="text-gray-400 mt-2">{t('home.stats.tournaments')}</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">24/7</div>
              <div className="text-gray-400 mt-2">{t('home.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
