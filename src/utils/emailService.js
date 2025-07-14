// Simple mock email service with fixed token
export const generateVerificationToken = () => {
  return '123456'; // Fixed mock token for all users
};

export const sendVerificationEmail = async (email) => {
  // Simulate email sending delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: 'Mock verification email sent. Use token: 123456'
      });
    }, 1500);
  });
};

export const verifyToken = (email, token) => {
  // Simple mock verification - always accept 123456
  if (token === '123456') {
    return { success: true, message: 'Email verified successfully' };
  }
  
  return { success: false, message: 'Invalid verification token. Please use: 123456' };
};

export const resendVerificationEmail = async (email) => {
  return await sendVerificationEmail(email);
};