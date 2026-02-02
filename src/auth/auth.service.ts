import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  async createUser(email: string, password: string, displayName?: string) {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
      });
      return { uid: userRecord.uid, email: userRecord.email };
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await admin.auth().getUserByEmail(email);
    } catch (error) {
      throw new Error(`User not found: ${error.message}`);
    }
  }
}
