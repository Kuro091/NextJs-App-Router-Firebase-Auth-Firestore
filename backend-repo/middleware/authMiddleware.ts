import { Request, Response, NextFunction } from 'express';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { User } from '../entities/User';
import { RequestWithUser } from '../entities/CustomRequest';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decodedToken: DecodedIdToken = await getAuth().verifyIdToken(token);

    const user: User = {
      id: decodedToken.uid,
      email: decodedToken.email || '',
      displayName: decodedToken.name,
      photoURL: decodedToken.picture,
      createdAt: new Date(decodedToken.auth_time),
      updatedAt: new Date(decodedToken.issued_at),
    };

    req.user = user;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
