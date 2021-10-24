import React, {FC, useState} from 'react';
import {Scheme} from '../entities/Scheme';
import {
  ChevronRightIcon,
  HStack,
  VStack,
  Text,
  Box,
  Avatar,
  Pressable,
  Slide,
  Button,
  CloseIcon,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SchemesNavProps} from '../screens/types';

interface SchemeTableEntryProps {
  scheme: Scheme;
  deleteScheme: (scheme: Scheme) => Promise<void>;
}

const SchemeTableEntry: FC<SchemeTableEntryProps> = ({
  scheme,
  deleteScheme,
}) => {
  const navigation = useNavigation<SchemesNavProps>();
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(currentMode => !currentMode);
  };

  return (
    <Box d="relative">
      <Pressable
        onPress={() => navigation.navigate('Entries')}
        onLongPress={toggleEditMode}>
        <Box borderBottomWidth="1" borderColor="coolGray.200" py={4}>
          <HStack justifyContent="space-between" alignItems="center">
            <Avatar bg="primary.700">{scheme.name.charAt(0)}</Avatar>
            <VStack>
              <Text fontSize="lg" bold>
                {scheme.name}
              </Text>
              <Text fontSize="sm">{`Last change: ${scheme.lastChangeAt.toLocaleDateString()}`}</Text>
            </VStack>
            <HStack alignItems="center">
              <Text fontSize="lg" mr={2} bold>
                {scheme.dataFields.length}
              </Text>
              <Text fontSize="sm">
                {scheme.dataFields.length === 1 ? 'Column' : 'Columns'}
              </Text>
            </HStack>
            <ChevronRightIcon />
          </HStack>
        </Box>
      </Pressable>
      <Slide in={isEditMode} placement="right" d="absolute" right={0}>
        <Button
          colorScheme="danger"
          mt={4}
          mb={4}
          onPress={() => deleteScheme(scheme)}>
          <CloseIcon color="white" />
        </Button>
      </Slide>
    </Box>
  );
};

export default SchemeTableEntry;
