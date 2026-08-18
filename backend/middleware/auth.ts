import { Request, Response, NextFunction } from 'express';
import { verifyToken, AdminTokenPayload } from '../services/auth.ts';

export interface AdminAuthRequest extends Request {
  admin?: AdminTokenPayload;
}

export function requireAdminAuth(req: AdminAuthRequest, res: Response, next: NextFunction) {
  let token: string | undefined;

  // 1. Check Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  // 2. Check cookie if authorization header is absent
  if (!token && req.cookies && req.cookies.admin_token) {
    token = req.cookies.admin_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in as an administrator.',
    });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired session token. Please log in again.',
    });
  }

  req.admin = payload;
  next();
}
