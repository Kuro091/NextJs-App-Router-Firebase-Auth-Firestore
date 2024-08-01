import { Response } from 'express';
import { RequestWithUser } from '../entities/CustomRequest';
import { UserCollection } from '../repository/userCollection';

export class ApiController {
  private userCollection: UserCollection;

  constructor() {
    this.userCollection = new UserCollection();
  }

  async createUser(req: RequestWithUser, res: Response) {
    try {
      const user = req.body;
      const existingUser = await this.userCollection.getUserByEmail(user.email);
      if (existingUser) {
        return res.status(409).send('User already exists');
      }

      await this.userCollection.createUser(user);
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send('Error creating user');
    }
  }

  async updateUser(req: RequestWithUser, res: Response) {
    try {
      const userId = req.params.userId;
      const updatedUser = req.body;
      await this.userCollection.updateUser(userId, updatedUser);
      res.status(200).send('User updated successfully');
    } catch (error) {
      res.status(500).send('Error updating user');
    }
  }

  async fetchUser(req: RequestWithUser, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await this.userCollection.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error fetching user');
    }
  }
}
