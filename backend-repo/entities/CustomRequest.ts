import { Request as ExpressRequest } from 'express';
import { User } from './User';

export interface RequestWithUser extends ExpressRequest {
  user?: User;
}
