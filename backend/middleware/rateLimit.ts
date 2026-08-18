import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore: Record<string, RateLimitRecord> = {};

export function createRateLimiter(options: { windowMs: number; max: number; message: string }) {
  const { windowMs, max, message } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const key = `${req.baseUrl || ''}${req.path}_${Array.isArray(ip) ? ip[0] : ip}`;
    const now = Date.now();

    const record = memoryStore[key];

    if (!record || now > record.resetAt) {
      memoryStore[key] = {
        count: 1,
        resetAt: now + windowMs,
      };
      return next();
    }

    record.count++;

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: message || 'Too many requests, please try again later.',
      });
    }

    next();
  };
}

// Clean up stale rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const key of Object.keys(memoryStore)) {
    if (now > memoryStore[key].resetAt) {
      delete memoryStore[key];
    }
  }
}, 10 * 60 * 1000);
