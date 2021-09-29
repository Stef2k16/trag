export interface Scheme {
  name: string;
  createdAt: Date;
  lastChange: Date;
  dataFields: DataField[];
  items: unknown[];
}

interface DataField {
  type: DataType;
  name: string;
}

type DataType = 'String' | 'Number';
