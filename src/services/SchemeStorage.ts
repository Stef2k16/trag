import {Scheme} from '../entities/Scheme';

// Provides method definitions to interact with a persistent storage, for example a database.
export interface SchemeStorage {
  createScheme: (scheme: Scheme) => Promise<void>;
  getSchemes: () => Promise<Scheme[]>;
  deleteScheme: (scheme: Scheme) => Promise<void>;
}
