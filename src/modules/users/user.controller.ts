import type { NextFunction, Request, Response } from 'express';
import { getUsersService } from './user.service';

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsersService();

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
