import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetToken,
  resetPassword,
} from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const registerUserController = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: '201',
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    console.error('User registration failed:', error);
    res.status(500).json({
      status: '500',
      message: 'User registration failed, please try again later.',
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const session = await loginUser(req.body);
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('User login failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'User login failed, please try again later.',
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    console.error('User logout failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'User logout failed, please try again later.',
    });
  }
};

export const refreshUserSessionController = async (req, res) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    console.error('Session refresh failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Session refresh failed, please try again later.',
    });
  }
};

export const requestResetEmailController = async (req, res) => {
  try {
    await requestResetToken(req.body.email);
    res.json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    console.error('Reset email request failed:', error);
    if (error.status === 404) {
      res.status(404).json({ status: 404, message: 'User not found!' });
    } else {
      res.status(500).json({
        status: 500,
        message: 'Failed to send the email, please try again later.',
      });
    }
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    await resetPassword(req.body);
    res.json({
      status: 200,
      message: 'Password was successfully reset!',
      data: {},
    });
  } catch (error) {
    console.error('Password reset failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Password reset failed, please try again later.',
    });
  }
};
