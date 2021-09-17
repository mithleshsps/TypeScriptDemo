import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loader = ({hide}: {hide: boolean}) => {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}>
      {hide ? <ActivityIndicator size={'large'} color="blue" /> : null}
    </View>
  );
};
export default Loader;
