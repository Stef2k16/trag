import React, {FC} from 'react';
import {Scheme} from '../entities/Scheme';
import {ChevronRightIcon, HStack, VStack, Text, Box, Avatar} from 'native-base';

interface SchemeTableEntryProps {
  scheme: Scheme;
}

const SchemeTableEntry: FC<SchemeTableEntryProps> = ({scheme}) => (
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
);

export default SchemeTableEntry;
