'use client';
import { useEffect, useState } from 'react';
import AuthButton from '../components/AuthButton';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
    
    // Add token to theme paths
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
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <AuthButton />
        <LanguageSelector />
        
        <div className="container mx-auto px-4 py-16">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 animate-gradient">
              {t('home.title')}
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div 
              className="group p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
              onClick={() => handleNavigate('/theme')}
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-300 group-hover:text-blue-200 transition-colors">
                {t('home.exploreThemes.title')}
              </h2>
              <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                {t('home.exploreThemes.description')}
              </p>
              <div className="inline-flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                {t('home.exploreThemes.button')}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
            
            <div 
              className="group p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/20"
              onClick={() => handleNavigate('/dashboard')}
            >
              <h2 className="text-2xl font-bold mb-4 text-indigo-300 group-hover:text-indigo-200 transition-colors">
                {t('home.dashboard.title')}
              </h2>
              <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                {t('home.dashboard.description')}
              </p>
              <div className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                {t('home.dashboard.button')}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              {t('home.featuredTournaments.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {['LCK', 'LEC', 'LCP', 'FirstStand2025'].map((tournament, index) => (
                <div 
                  key={tournament}
                  className={`group p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleNavigate(`/theme/${tournament}`)}
                >
                  <h3 className="text-lg font-semibold text-blue-300 mb-2 group-hover:text-blue-200 transition-colors">
                    {tournament}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {t(`home.featuredTournaments.${tournament}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
