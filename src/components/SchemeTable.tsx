import React, {FC} from 'react';
import {Scheme} from '../entities/Scheme';
import {Box, Divider, FlatList} from 'native-base';
import SchemeTableEntry from './SchemeTableEntry';

interface SchemeTableProps {
  schemes: Scheme[];
  deleteScheme: (scheme: Scheme) => Promise<void>;
}

const SchemeTable: FC<SchemeTableProps> = ({schemes, deleteScheme}) => (
  <Box w="full">
    <FlatList
      data={schemes}
      renderItem={({item}) => (
        <SchemeTableEntry scheme={item} deleteScheme={deleteScheme} />
      )}
      keyExtractor={item => item.name}
    />
    <Divider bg="indigo.500" />
  </Box>
);

export default SchemeTable;
