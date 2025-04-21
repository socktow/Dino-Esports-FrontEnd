'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from 'next/navigation';
import { usersAPI } from '../../api';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('information');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailForm, setEmailForm] = useState({ email: '' });
  const [passwordForm, setPasswordForm] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateError, setUpdateError] = useState('');
  const { user, token, loading: authLoading, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to finish loading before checking token
    if (authLoading) return;
    
    // Redirect if not logged in
    if (!token) {
      router.push('/auth/login');
      return;
    }

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await usersAPI.getUserProfile(token);
        setUserData(data.data);
        setEmailForm({ email: data.data.email });
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, router, logout, authLoading]);

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setUpdateSuccess('');
    setUpdateError('');

    try {
      const data = await usersAPI.updateEmail(token, emailForm.email);
      setUpdateSuccess(t('profile.updateEmailSuccess'));
      setUserData({ ...userData, email: emailForm.email });
    } catch (err) {
      setUpdateError(err.message || 'Failed to update email');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setUpdateSuccess('');
    setUpdateError('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setUpdateError(t('profile.passwordsDontMatch'));
      return;
    }

    try {
      await usersAPI.updatePassword(
        token, 
        passwordForm.currentPassword, 
        passwordForm.newPassword
      );
      setUpdateSuccess(t('profile.updatePasswordSuccess'));
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setUpdateError(err.message || 'Failed to update password');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">{t('Loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t('profile.personalInfo')}</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'information'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('information')}
          >
            {t('profile.personalInfo')}
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'change'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('change')}
          >
            {t('profile.changePassword')}
          </button>
        </div>
        
        {/* Information Tab */}
        {activeTab === 'information' && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">{t('common.username')}</h3>
                <p className="text-xl">{userData?.username}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">{t('common.email')}</h3>
                <p className="text-xl">{userData?.email}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">{t('common.userId')}</h3>
                <p className="text-xl">{userData?._id}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm mb-1">{t('common.accountCreated')}</h3>
                <p className="text-xl">
                  {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Change Information Tab */}
        {activeTab === 'change' && (
          <div className="space-y-8">
            {/* Email Change Form */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-medium mb-4">{t('profile.changeEmail')}</h3>
              <form onSubmit={handleEmailChange}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    {t('common.email')}
                  </label>
                  <input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('profile.update')}
                </button>
              </form>
            </div>
            
            {/* Password Change Form */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-medium mb-4">{t('profile.changePassword')}</h3>
              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    {t('profile.currentPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    {t('profile.newPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 text-sm mb-2">
                    {t('profile.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('profile.update')}
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Success/Error Messages */}
        {updateSuccess && (
          <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
            {updateSuccess}
          </div>
        )}
        
        {updateError && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
            {updateError}
          </div>
        )}
      </div>
    </div>
  );
} 