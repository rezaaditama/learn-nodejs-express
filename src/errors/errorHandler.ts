import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { ApiError } from './apiError';
import { logger } from '@/app';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Kalau Error di Zod Validation
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: false,
      message: 'Validation ZodSchema Failed',
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  //   Kalau Error waktu Hit API
  if (err instanceof ApiError) {
    logger.error({
      message: err.message,
      status: err.statusCode,
      details: err.details,
      url: req.url,
    });
  }

  //   Error yang lain
  logger.error(err);

  //   Kalau error ada di server
  return res.status(500).json({
    status: false,
    message: 'Internal Server Error',
  });
};
