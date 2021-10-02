import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Schemes: undefined;
  Entries: undefined;
};
export type SchemesScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Schemes'
>;

export type EntriesScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  'Schemes'
>;
