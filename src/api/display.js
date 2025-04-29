import { API_URL } from './index';

/**
 * Get display settings by host (username)
 * @param {string} token - JWT token for authentication
 * @param {string} host - Username of the host
 * @returns {Promise} - Response from the API
 */
export const getDisplaySettings = async (token, host) => {
    try {
        const response = await fetch(`${API_URL}/users/display/${host}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch display settings');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Create or update display settings
 * @param {string} token - JWT token for authentication
 * @param {string} host - Username of the host
 * @param {Object} teamConfig - Team configuration
 * @param {Object} playerConfig - Player configuration
 * @returns {Promise} - Response from the API
 */
export const createDisplay = async (token, host, teamConfig, playerConfig) => {
    try {
        const response = await fetch(`${API_URL}/users/display/${host}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ teamConfig, playerConfig }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create/update display settings');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update team configuration
 * @param {string} token - JWT token for authentication
 * @param {string} host - Username of the host
 * @param {Object} teamConfig - Team configuration
 * @returns {Promise} - Response from the API
 */
export const updateTeamConfig = async (token, host, teamConfig) => {
    try {
        const response = await fetch(`${API_URL}/users/display/team/${host}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamConfig),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update team configuration');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update player configuration
 * @param {string} token - JWT token for authentication
 * @param {string} host - Username of the host
 * @param {Object} playerConfig - Player configuration
 * @returns {Promise} - Response from the API
 */
export const updatePlayerConfig = async (token, host, playerConfig) => {
    try {
        const response = await fetch(`${API_URL}/users/display/player/${host}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerConfig),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update player configuration');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Reset display settings to default
 * @param {string} token - JWT token for authentication
 * @param {string} host - Username of the host
 * @returns {Promise} - Response from the API
 */
export const resetDisplay = async (token, host) => {
    try {
        const response = await fetch(`${API_URL}/users/display/reset/${host}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to reset display settings');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};
