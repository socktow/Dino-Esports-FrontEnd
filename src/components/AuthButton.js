'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function AuthButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="fixed top-4 right-4 flex items-center gap-4">
        {user ? (
          <>
            <span className="text-white">
              Hello, <Link href="/profile" className="font-bold text-blue-400 hover:text-blue-300 transition-colors">{user.username}</Link>
            </span>
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        )}
      </div>

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
} 