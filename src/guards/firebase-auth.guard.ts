import { Injectable } from '@nestjs/common';
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken; // Attach user info to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}