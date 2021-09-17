import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../service/header2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = (props: any) => {
  return (
    <View style={{flex: 1}}>
      <Header name={'Setting'} />
      <View style={{width: '100%', marginTop: '5%'}}>
        <View
          style={{
            width: '90%',
            marginHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: hp('2%'),
            }}>
            Change Language
          </Text>

          <AntDesign name={'arrowright'} color="#000" size={hp('3%')} />
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'gray',
            marginVertical: hp('2%'),
          }}
        />
      </View>
    </View>
  );
};

export default Setting;
