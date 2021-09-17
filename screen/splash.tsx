import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const splash = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  );
};

export default splash;
