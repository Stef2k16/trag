import React, {FC, useEffect, useState} from 'react';
import {AddIcon, Box, Fab, Heading, VStack} from 'native-base';
import SchemeTable from '../components/SchemeTable';
import {Scheme} from '../entities/Scheme';
import {useSQLiteSchemeStorage} from '../context/SQLiteStorage';
import {SchemeStorage} from '../services/SchemeStorage';

const scheme1: Scheme = {
  name: 'AnotherScheme',
  createdAt: new Date(),
  lastChangeAt: new Date(),
  dataFields: [
    {
      type: 'String',
      name: 'Field1',
      schemeName: 'Scheme1',
    },
    {
      type: 'Number',
      name: 'Field2',
      schemeName: 'Scheme1',
    },
  ],
};

const Schemes: FC = () => {
  const schemeStorage = useSQLiteSchemeStorage();
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  // Load schemes from database.
  const loadSchemes = async (storage: SchemeStorage) => {
    console.log('Loading schemes with storage: ', storage);
    const storedSchemes = await storage.getSchemes();
    setSchemes(storedSchemes);
  };

  // Add a new scheme to the database and to the component state.
  const addScheme = async () => {
    if (schemeStorage != null) {
      await schemeStorage.createScheme(scheme1);
      setSchemes(prevSchemes => [...prevSchemes, scheme1]);
    }
  };

  useEffect(() => {
    if (schemeStorage != null) {
      loadSchemes(schemeStorage);
    }
  }, [schemeStorage]);

  return (
    <Box w="full" p={4}>
      <VStack alignItems="center">
        <Heading size="lg">Schemes</Heading>
        <SchemeTable schemes={schemes} />
        <Fab
          placement="bottom-right"
          icon={<AddIcon size="4" />}
          onPress={() => addScheme()}
        />
      </VStack>
    </Box>
  );
};

export default Schemes;
