import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './screen/navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Navigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
