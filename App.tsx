import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Schemes from './src/screens/Schemes';
import SchemeEntries from './src/screens/SchemeEntries';
import {RootStackParamList} from './src/screens/types';
import {SQLiteProvider} from './src/context/SQLiteStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NativeBaseProvider>
      <SQLiteProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Schemes">
            <Stack.Screen name="Schemes" component={Schemes} />
            <Stack.Screen name="Entries" component={SchemeEntries} />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </NativeBaseProvider>
  );
};
export default App;
