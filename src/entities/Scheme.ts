export interface Scheme {
  name: string;
  createdAt: Date;
  lastChangeAt: Date;
  dataFields: DataField[];
}

export interface DataField {
  type: DataType;
  name: string;
  schemeName: string;
}

type DataType = 'String' | 'Number';
