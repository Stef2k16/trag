import {SchemeStorage} from './SchemeStorage';
import {DataField, Scheme} from '../entities/Scheme';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

// Implementation to store schemes in an SQLite database.
export class SQLiteSchemeStorage implements SchemeStorage {
  private db: SQLiteDatabase;
  private readonly schemeTable: string;
  private readonly dataFieldTable: string;

  constructor(db: SQLiteDatabase, schemeTable: string, dataFieldTable: string) {
    this.db = db;
    this.schemeTable = schemeTable;
    this.dataFieldTable = dataFieldTable;
  }

  async createScheme(scheme: Scheme): Promise<void> {
    try {
      await this.db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO ${this.schemeTable} (Name, CreatedAt, LastChangeAt) VALUES (?, ?, ?)`,
          [
            scheme.name,
            scheme.createdAt.getTime(),
            scheme.lastChangeAt.getTime(),
          ],
        );
        scheme.dataFields.forEach(field => {
          txn.executeSql(
            `INSERT INTO ${this.dataFieldTable} (Type, Name, SchemeName) VALUES (?, ?, ?)`,
            [field.type, field.name, scheme.name],
          );
        });
        txn.executeSql(this.createItemTableQuery(scheme));
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // Create a query to add a new table for the items of a scheme.
  private createItemTableQuery(scheme: Scheme): string {
    let createItemTableQuery = `CREATE TABLE IF NOT EXISTS ${scheme.name}(`;
    scheme.dataFields.forEach((field, index) => {
      createItemTableQuery += `${field.name} ${field.type}`;
      if (index < scheme.dataFields.length - 1) {
        createItemTableQuery += ', ';
      }
    });
    createItemTableQuery += ');';
    return createItemTableQuery;
  }

  async getSchemes(): Promise<Scheme[]> {
    try {
      const results = await this.db.executeSql(`
          SELECT * FROM ${this.schemeTable}
            INNER JOIN ${this.dataFieldTable}
            ON ${this.schemeTable}.Name = ${this.dataFieldTable}.SchemeName;
        `);
      const schemeMap = new Map<string, Scheme>();
      results.forEach(result => {
        if (result.rows.length > 0) {
          for (let index = 0; index < result.rows.length; index++) {
            const currentRow = result.rows.item(index);
            const dataField: DataField = {
              type: currentRow.Type,
              name: currentRow.Name,
              schemeName: currentRow.SchemeName,
            };
            if (schemeMap.has(currentRow.SchemeName)) {
              schemeMap.get(currentRow.SchemeName)?.dataFields.push(dataField);
            } else {
              const newScheme: Scheme = {
                name: currentRow.SchemeName,
                createdAt: new Date(currentRow.CreatedAt),
                lastChangeAt: new Date(currentRow.LastChangeAt),
                dataFields: [dataField],
              };
              schemeMap.set(currentRow.SchemeName, newScheme);
            }
          }
        }
      });
      return [...schemeMap.values()];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
