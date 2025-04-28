// API endpoints for tournament operations
import Cookies from 'js-cookie';
import { API_URL } from './index';
/**
 * Create a new tournament
 * @param {Object} formData - Tournament data including name and logo
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - Response from the API
 */
export const createTournament = async (formData, token) => {
    try {
        const response = await fetch(`${API_URL}/users/tournaments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create tournament');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all tournaments
 * @returns {Promise} - Response from the API
 */
export const getTournaments = async () => {
    try {
        const response = await fetch(`${API_URL}/users/tournaments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tournaments');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get tournament by ID
 * @param {string} tournamentId - ID of the tournament
 * @returns {Promise} - Response from the API
 */
export const getTournamentById = async (tournamentId) => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/users/tournaments/${tournamentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized access
                Cookies.remove('token');
                window.location.href = '/login';
                throw new Error('Session expired. Please login again.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getTournamentById:', error);
        throw error;
    }
};

/**
 * Update tournament
 * @param {string} tournamentId - ID of the tournament
 * @param {Object} formData - Updated tournament data
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - Response from the API
 */
export const updateTournament = async (tournamentId, formData, token) => {
    try {
        const response = await fetch(`${API_URL}/users/tournaments/${tournamentId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update tournament');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete tournament
 * @param {string} tournamentId - ID of the tournament
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - Response from the API
 */
export const deleteTournament = async (tournamentId, token) => {
    try {
        const response = await fetch(`${API_URL}/users/tournaments/${tournamentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete tournament');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Add team to tournament
 * @param {string} tournamentId - ID of the tournament
 * @param {Object} formData - Team data including name, tag and logo
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - Response from the API
 */
export const addTeamToTournament = async (tournamentId, formData, token) => {
    try {
        const response = await fetch(`${API_URL}/users/tournaments/${tournamentId}/addteam`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to add team to tournament');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get tournaments by username
 * @param {string} username - Username to get tournaments for
 * @returns {Promise} - Response from the API
 */
export const getTournamentsByUser = async (username) => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/users/tournaments/host/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized access
                Cookies.remove('token');
                window.location.href = '/login';
                throw new Error('Session expired. Please login again.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getTournamentsByUser:', error);
        throw error;
    }
};
