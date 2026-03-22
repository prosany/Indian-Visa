import { skipSanitize } from '@/constants/skip';
import { NextFunction, Request, Response } from 'express';
import xssClean from 'xss-clean';

const _xss = xssClean();

export const xss = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeCheck = skipSanitize.some(
    (path) => req.path.startsWith(path) || req.path.includes(path),
  );
  if (sanitizeCheck) {
    return next();
  }
  return _xss(req, res, next);
};
