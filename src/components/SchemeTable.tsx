import React, {FC} from 'react';
import {Scheme} from '../entities/Scheme';
import {Box, Divider, FlatList} from 'native-base';
import SchemeTableEntry from './SchemeTableEntry';

interface SchemeTableProps {
  schemes: Scheme[];
}

const SchemeTable: FC<SchemeTableProps> = ({schemes}) => (
  <Box w="full">
    <FlatList
      data={schemes}
      renderItem={({item}) => <SchemeTableEntry scheme={item} />}
      keyExtractor={item => item.name}
    />
    <Divider bg="indigo.500" />
  </Box>
);

export default SchemeTable;
