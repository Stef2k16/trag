import React from 'react';
import {Box, Heading, NativeBaseProvider, VStack} from 'native-base';
import SchemeTable from './src/components/SchemeTable';
import {Scheme} from './src/entities/Scheme';

const schemes: Scheme[] = [
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

const App = () => {
  return (
    <NativeBaseProvider>
      <Box w="full" p={4}>
        <VStack alignItems="center">
          <Heading size="lg">Schemes</Heading>
          <SchemeTable schemes={schemes} />
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};
export default App;
