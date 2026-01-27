import { Injectable, NotFoundException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class StudentsService {
  private db = admin.firestore();

  async findAll() {
    const snapshot = await this.db.collection('students').get();

    // Check if the collection is empty
    if (snapshot.empty) {
      return [];
    }

    // Map through the docs to get data + the document ID
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async createStudent(data: any) {
    // .add() automatically generates a unique Document ID
    const docRef = await this.db.collection('students').add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return { id: docRef.id, message: 'Data saved successfully!' };
  }

  async deleteStudent(id: string) {
    const docRef = this.db.collection('students').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await docRef.delete();
    return { message: `Student ${id} deleted successfully` };
  }
}
