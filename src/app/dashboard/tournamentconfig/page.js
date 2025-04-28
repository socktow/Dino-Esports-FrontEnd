'use client';

import { useState, useEffect } from 'react';
import { createTournament, getTournamentsByUser, updateTournament, deleteTournament } from '@/api/tournamentapi';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const TournamentConfig = () => {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tournamentToDelete, setTournamentToDelete] = useState(null);
  const itemsPerPage = 4;
  const [tournament, setTournament] = useState({
    name: '',
    image: null,
    imagePreview: null,
  });
  const [editingTournament, setEditingTournament] = useState(null);

  useEffect(() => {
    fetchTournaments();
  }, [user]);

  const fetchTournaments = async () => {
    if (user?.username) {
      try {
        setLoading(true);
        const response = await getTournamentsByUser(user.username);
        if (response.success) {
          const sortedTournaments = response.data.sort((a, b) => b.tournamentId - a.tournamentId);
          setTournaments(sortedTournaments);
        }
      } catch (error) {
        toast.error('Failed to fetch tournaments');
      } finally {
        setLoading(false);
      }
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(tournaments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTournaments = tournaments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTournament(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('Please login again');
        return;
      }

      if (!tournament.image && !editingTournament) {
        toast.error('Tournament logo is required');
        return;
      }

      setSubmitting(true);

      if (editingTournament) {
        const formData = new FormData();
        formData.append('name', tournament.name);
        if (tournament.image instanceof File) {
          formData.append('logo', tournament.image);
        }
        
        const response = await updateTournament(editingTournament.tournamentId, formData, token);
        if (response.success) {
          setTournaments(prev => 
            prev.map(t => 
              t.tournamentId === editingTournament.tournamentId 
                ? { 
                    ...t, 
                    name: response.data.New.name,
                    logo: response.data.New.logo,
                    teams: response.data.New.teams,
                    updatedAt: response.data.New.updatedAt
                  }
                : t
            ).sort((a, b) => b.tournamentId - a.tournamentId)
          );
          
          setTournament({ name: '', image: null, imagePreview: null });
          setEditingTournament(null);
          toast.success('Tournament updated successfully');
        }
      } else {
        const formData = new FormData();
        formData.append('name', tournament.name);
        if (tournament.image instanceof File) {
          formData.append('logo', tournament.image);
        }

        // Debug log
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
          console.log(pair[0] + ': ' + pair[1]);
        }
        
        const response = await createTournament(formData, token);
        if (response.success) {
          setTournaments(prev => 
            [...prev, response.data].sort((a, b) => b.tournamentId - a.tournamentId)
          );
          setTournament({ name: '', image: null, imagePreview: null });
          toast.success('Tournament created successfully');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Failed to save tournament');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament);
    setTournament({
      name: tournament.name,
      image: null,
      imagePreview: tournament.logo
    });
  };

  const handleDeleteClick = (tournament) => {
    setTournamentToDelete(tournament);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!tournamentToDelete) return;

    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('Please login again');
        return;
      }
      setDeletingId(tournamentToDelete.tournamentId);
      const response = await deleteTournament(tournamentToDelete.tournamentId, token);
      if (response.success) {
        // Remove the tournament from the state
        setTournaments(prev => 
          prev.filter(t => t.tournamentId !== tournamentToDelete.tournamentId)
        );
        toast.success('Tournament deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete tournament');
    } finally {
      setDeletingId(null);
      setShowDeleteModal(false);
      setTournamentToDelete(null);
    }
  };

  return (
    <div className="max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Tournament Configuration</h1>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tournament Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Tournament Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Name</label>
              <input
                type="text"
                value={tournament.name}
                onChange={(e) => setTournament(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter tournament name"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={submitting}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingTournament ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingTournament ? 'Update Tournament' : 'Create Tournament'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Image Upload */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Tournament Image</h2>
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              {tournament.imagePreview ? (
                <div className="relative">
                  <img 
                    src={tournament.imagePreview} 
                    alt="Tournament preview" 
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => setTournament(prev => ({ ...prev, image: null, imagePreview: null }))}
                    className="absolute top-2 right-2 p-2 bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={submitting}
                  >
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-gray-400">
                    <label className={`cursor-pointer ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <span className="text-blue-400 hover:text-blue-300">Click to upload</span> or drag and drop
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={submitting}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tournament List */}
      <div className="mt-12">
        <h1 className="text-3xl font-bold text-white mb-8">Tournament List</h1>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Logo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tournament Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Teams
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {currentTournaments.map((tournament) => (
                    <tr key={tournament.tournamentId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={tournament.logo}
                          alt={tournament.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{tournament.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-white">
                          {tournament.teams?.length || 0} teams
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(tournament)}
                          className="text-blue-400 hover:text-blue-300 mr-4"
                          disabled={submitting || deletingId === tournament.tournamentId}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tournament)}
                          className="text-red-400 hover:text-red-300"
                          disabled={submitting || deletingId === tournament.tournamentId}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Delete Confirmation Modal */}
              {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
                    <h3 className="text-lg font-semibold text-white mb-4">Delete Tournament</h3>
                    <p className="text-gray-300 mb-6">
                      Are you sure you want to delete the tournament `{tournamentToDelete?.name}`? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => {
                          setShowDeleteModal(false);
                          setTournamentToDelete(null);
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                        disabled={deletingId === tournamentToDelete?.tournamentId}
                      >
                        {deletingId === tournamentToDelete?.tournamentId ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 py-4 bg-gray-700">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentConfig; 