import { Request, Response } from 'express';
import { getAdminByEmail, updateAdminLastLogin } from '../database/db.ts';
import { comparePassword, generateToken } from '../services/auth.ts';
import { AdminAuthRequest } from '../middleware/auth.ts';

export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.',
      });
    }

    const admin = await getAdminByEmail(String(email));
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email address or password.',
      });
    }

    const isValid = await comparePassword(String(password), admin.password_hash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email address or password.',
      });
    }

    // Update last login
    await updateAdminLastLogin(admin.id);

    // Generate JWT token
    const token = generateToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });

    // Set cookie for browser sessions
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
      message: 'Login successful.',
    });
  } catch (err: any) {
    console.error('Error during admin login:', err);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred during authentication.',
    });
  }
}

export async function logoutAdmin(req: Request, res: Response) {
  res.clearCookie('admin_token');
  return res.json({
    success: true,
    message: 'Logged out successfully.',
  });
}

export async function getAdminMe(req: AdminAuthRequest, res: Response) {
  return res.json({
    success: true,
    admin: req.admin,
  });
}
