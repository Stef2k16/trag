import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Schemes: undefined;
  Entries: undefined;
};

export type SchemesNavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Schemes'
>;

export type EntriesNavProps = NativeStackNavigationProp<
  RootStackParamList,
  'Schemes'
>;
