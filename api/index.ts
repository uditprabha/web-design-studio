import type { IncomingMessage, ServerResponse } from 'http';
import { createExpressApp } from '../backend/app.ts';

const app = createExpressApp();

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return app(req, res);
}
