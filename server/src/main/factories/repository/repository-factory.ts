import { Repository } from '@pedido-express/core';
import { environment } from '../../configuration/environment';
import {
  FirestoreDatabase,
  InMemoryDatabase,
  PrismaDatabase,
} from '../../databases';

export const makeRepository = async (): Promise<Repository> => {
  const { datasource } = environment;
  switch (datasource) {
    case 'prisma': {
      const prisma = new PrismaDatabase();
      await prisma.connect();
      return prisma;
    }
    case 'firestore':
      return FirestoreDatabase.create();
    case 'in-memory':
      return new InMemoryDatabase();
    default:
      throw new Error('Datasource not found');
  }
};
