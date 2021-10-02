import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Schemes: undefined;
  Entries: undefined;
};

export type entriesScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'Entries'
>;

export type schemesScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'Schemes'
>;
