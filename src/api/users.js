// API endpoints for user operations
const API_URL = 'https://kiemhieptinhduyen.cloud/api';

/**
 * Get user profile
 * @param {string} token - JWT token for authentication
 * @returns {Promise} - Response from the API
 */
export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user email
 * @param {string} token - JWT token for authentication
 * @param {string} email - New email address
 * @returns {Promise} - Response from the API
 */
export const updateEmail = async (token, email) => {
  try {
    const response = await fetch(`${API_URL}/users/email`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update email');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user password
 * @param {string} token - JWT token for authentication
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} - Response from the API
 */
export const updatePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/users/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update password');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}; 