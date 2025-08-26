const API_BASE_URL = import.meta.env.VITE_API_URL;
class EmailService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`;
  }

  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include cookies
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Send verification email
  async sendVerificationEmail(email) {
    try {
      const data = await this.apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ 
          email,
          // These will be collected in the next step
          name: '', 
          password: '',
          confirmPassword: ''
        }),
      });

      return {
        success: true,
        message: data.message,
        data: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send verification email'
      };
    }
  }

  // Verify email token
  async verifyToken(email, token) {
    try {
      const data = await this.apiCall('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, token }),
      });

      // Store token in localStorage if verification successful
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Token verification failed'
      };
    }
  }

  // Resend verification email
  async resendVerificationEmail(email) {
    try {
      const data = await this.apiCall('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to resend verification email'
      };
    }
  }

  // Register user with complete details
  async registerUser(userData) {
    try {
      const data = await this.apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      return {
        success: true,
        message: data.message,
        user: data.user
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  // Login user
  async loginUser(email, password) {
    try {
      const data = await this.apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      // Store token and user data
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return {
        success: true,
        message: 'Login successful',
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed',
        needsVerification: error.message?.includes('verify')
      };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token');
      }

      const data = await this.apiCall('/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      return {
        success: true,
        user: data.user
      };
    } catch (error) {
      // Clear invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return {
        success: false,
        message: error.message || 'Failed to get user data'
      };
    }
  }

  // Logout user
  async logout() {
    try {
      await this.apiCall('/auth/logout', {
        method: 'GET'
      });

      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      // Clear local storage anyway
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return {
        success: false,
        message: error.message || 'Logout failed'
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  }

  // Get stored user data
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem('authToken');
  }
}

// Export functions for backward compatibility
const emailService = new EmailService();

export const sendVerificationEmail = (email) => emailService.sendVerificationEmail(email);
export const verifyToken = (email, token) => emailService.verifyToken(email, token);
export const resendVerificationEmail = (email) => emailService.resendVerificationEmail(email);
export const registerUser = (userData) => emailService.registerUser(userData);
export const loginUser = (email, password) => emailService.loginUser(email, password);
export const getCurrentUser = () => emailService.getCurrentUser();
export const logout = () => emailService.logout();

export default emailService;