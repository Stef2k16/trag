import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {SchemeStorage} from '../services/SchemeStorage';
import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import {SQLiteSchemeStorage} from '../services/SQLiteSchemeStorage';

enablePromise(true);

const SQLiteStorageContext = createContext<SchemeStorage | undefined>(
  undefined,
);

const schemeTableName = 'Scheme';
const dataFieldsTableName = 'DataField';

// Creates the provider for SQLite. Creates the required tables and opens the database.
const SQLiteProvider: FC = ({children}) => {
  const [storageService, setStorageService] = useState<
    SchemeStorage | undefined
  >(undefined);

  const openDB = async (): Promise<void> => {
    const db = await openDatabase({name: 'trag.db', location: 'default'});
    const createSchemeTableQuery = `CREATE TABLE IF NOT EXISTS ${schemeTableName}( 
        Name TEXT NOT NULL UNIQUE PRIMARY KEY,
        CreatedAt INTEGER NOT NULL, 
        LastChangeAt INTEGER NOT NULL
    );`;
    const createDataFieldsTableQuery = `CREATE TABLE IF NOT EXISTS ${dataFieldsTableName}(
        Type TEXT NOT NULL,
        Name TEXT NOT NULL,
        SchemeName TEXT NOT NULL,
        FOREIGN KEY (SchemeName)
          REFERENCES ${schemeTableName} (Name)
    );`;
    try {
      await db.executeSql(createSchemeTableQuery);
      await db.executeSql(createDataFieldsTableQuery);
    } catch (err) {
      console.error(err);
    }
    const SQLiteStorageService: SchemeStorage = new SQLiteSchemeStorage(
      db,
      schemeTableName,
      dataFieldsTableName,
    );
    setStorageService(SQLiteStorageService);
  };

  useEffect(() => {
    openDB();
  }, []);

  return (
    <SQLiteStorageContext.Provider value={storageService}>
      {children}
    </SQLiteStorageContext.Provider>
  );
};

const useSQLiteSchemeStorage = (): SchemeStorage | undefined => {
  return useContext(SQLiteStorageContext);
};
export {SQLiteProvider, useSQLiteSchemeStorage};
