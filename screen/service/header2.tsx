import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const Header2 = ({name}: {name: string}) => {
  const navigation = useNavigation<any>();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View style={Styles.main_Container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={Styles.first_Row}>
        <AntDesign name={'arrowleft'} color="#FFF" size={hp('4%')} />
      </TouchableOpacity>
      <View style={Styles.second_Row}>
        <Text numberOfLines={1} style={{color: '#FFF', fontSize: hp('2.5%')}}>
          {capitalize(name)}
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  main_Container: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#207CB7',
    flexDirection: 'row',
  },
  first_Row: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_Row: {
    width: '70%',
    height: '100%',
    marginRight: '15%',
    justifyContent: 'center',
  },
});

export default Header2;
