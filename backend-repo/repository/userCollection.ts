import { User } from '../entities/User';
import { fireStoreDb } from '../core/app';

export class UserCollection {
  async createUser(user: User): Promise<FirebaseFirestore.DocumentReference> {
    const docRef = fireStoreDb.collection('users').doc(user.id);
    await docRef.set(user);
    return docRef;
  }

  async getUserById(userId: string): Promise<User | null> {
    const doc = await fireStoreDb.collection('users').doc(userId).get();
    if (doc.exists) {
      console.log('Document data:', doc.data());
      return doc.data() as User;
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const querySnapshot = await fireStoreDb.collection('users').where('email', '==', email).get();

    if (querySnapshot.empty) {
      return null;
    }

    const user = querySnapshot.docs[0].data() as User;
    return user;
  }

  async updateUser(userId: string, updatedUser: User): Promise<void> {
    await fireStoreDb
      .collection('users')
      .doc(userId)
      .update({ ...updatedUser });
  }
}
