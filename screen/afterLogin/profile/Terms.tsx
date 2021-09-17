import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../service/header2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Terms = (props: any) => {
  return (
    <View style={{flex: 1}}>
      <Header name={'Terms & Conditions'} />
      <View style={{width: '90%', marginHorizontal: '5%', marginTop: hp('2%')}}>
        <Text style={{fontSize: hp('2%'), color: '#000', fontWeight: 'bold'}}>
          What is TypeScript
        </Text>
        <Text
          style={{
            fontWeight: 'normal',
            fontSize: hp('2%'),
            color: 'gray',
            marginTop: hp('.5%'),
          }}>
          TypeScript is a language which extends JavaScript by adding type
          definitions, much like Flow. While React Native is built in Flow, it
          supports both TypeScript and Flow by default.
        </Text>
      </View>
    </View>
  );
};

export default Terms;
