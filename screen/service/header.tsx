import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={Styles.main_Container}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={Styles.first_Row}>
        <Entypo name="menu" size={hp('4%')} color="#FFF" />
      </TouchableOpacity>
      <View style={Styles.second_Row}>
        <Text style={Styles.title_Label}>Home</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_Label: {
    fontSize: hp('2.5%'),
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Header;
