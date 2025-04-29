// Export all API functions
import * as authAPI from './auth';
import * as usersAPI from './users';
import * as tournamentAPI from './tournamentapi';
import * as displayAPI from './display';

const API_URL = 'https://kiemhieptinhduyen.cloud/api';

export {
  authAPI,
  usersAPI,
  tournamentAPI,
  displayAPI,
  API_URL
}; 
