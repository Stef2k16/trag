import React, {FC} from 'react';
import {Scheme} from '../entities/Scheme';
import {
  ChevronRightIcon,
  HStack,
  VStack,
  Text,
  Box,
  Avatar,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SchemesScreenProps} from '../screens/types';

interface SchemeTableEntryProps {
  scheme: Scheme;
}

const SchemeTableEntry: FC<SchemeTableEntryProps> = ({scheme}) => {
  const navigation = useNavigation<SchemesScreenProps>();
  return (
    <Pressable onPress={() => navigation.navigate('Entries')}>
      <Box borderBottomWidth="1" borderColor="coolGray.200" py={4}>
        <HStack justifyContent="space-between" alignItems="center">
          <Avatar bg="primary.700">{scheme.name.charAt(0)}</Avatar>
          <VStack>
            <Text fontSize="lg" bold>
              {scheme.name}
            </Text>
            <Text fontSize="sm">{`Last change: ${scheme.lastChange.toLocaleDateString()}`}</Text>
          </VStack>
          <HStack alignItems="center">
            <Text fontSize="lg" mr={2} bold>
              {scheme.items.length}
            </Text>
            <Text fontSize="sm">
              {scheme.items.length === 1 ? 'Item' : 'Items'}
            </Text>
          </HStack>
          <ChevronRightIcon />
        </HStack>
      </Box>
    </Pressable>
  );
};

export default SchemeTableEntry;
