import React, {FC} from 'react';
import {Box, Heading, VStack} from 'native-base';
import SchemeTable from '../components/SchemeTable';
import {Scheme as DataScheme} from '../entities/Scheme';

const schemes: DataScheme[] = [
  {
    name: 'Scheme1',
    createdAt: new Date(),
    lastChange: new Date(),
    dataFields: [
      {
        type: 'String',
        name: 'Field1',
      },
      {
        type: 'Number',
        name: 'Field2',
      },
    ],
    items: [1, 2, 3],
  },
  {
    name: 'AnotherOne',
    createdAt: new Date(),
    lastChange: new Date(),
    dataFields: [
      {
        type: 'String',
        name: 'Field1',
      },
      {
        type: 'Number',
        name: 'Field2',
      },
    ],
    items: [1, 2],
  },
];

const Schemes: FC = () => {
  return (
    <Box w="full" p={4}>
      <VStack alignItems="center">
        <Heading size="lg">Schemes</Heading>
        <SchemeTable schemes={schemes} />
      </VStack>
    </Box>
  );
};

export default Schemes;
