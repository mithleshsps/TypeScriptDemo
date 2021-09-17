import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileIcon} from '../utils/Images';
import * as Storage from '../service/storage';

const CustomDrawer = (props: any) => {
  let navigation = useNavigation();
  const [email, setEmail] = useState<string>('');

  React.useEffect(() => {
    Storage.GetData('Email').then(value => {
      if (value != null) {
        setEmail(value.toString());
      }
    });
  }, []);
  const logout = () => {
    Alert.alert('Warning', 'Are you sure? You want to log-off from TSApp. ', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{name: 'BeforeLogin'}],
          });
        },
      },
    ]);
  };
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View style={styles.Main_Container}>
      <View style={styles.First_Container}>
        <Image
          style={{width: wp('30%'), height: wp('30%'), borderRadius: wp('15%')}}
          source={ProfileIcon}
        />
        <Text style={styles.Gust_Label}>{capitalize(email)} </Text>
      </View>
      <TouchableOpacity
        style={styles.option_Container}
        onPress={() => navigation.navigate('Category')}>
        <Text style={styles.option_Label}>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option_Container}
        onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.option_Label}>Terms & Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option_Container}
        onPress={() => navigation.navigate('Setting')}>
        <Text style={styles.option_Label}>Setting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option_Container}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.option_Label}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Logout_Button_Container}
        onPress={() => logout()}>
        <Text style={styles.Logout_Label}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Main_Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  Gust_Label: {
    fontSize: hp('2.5%'),
    color: '#FFF',
    marginTop: hp('2%'),
  },
  First_Container: {
    width: '100%',
    height: hp('30%'),
    backgroundColor: '#207CB7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logout_Button_Container: {
    position: 'absolute',
    bottom: hp('2%'),
    alignSelf: 'center',
  },
  Logout_Label: {
    color: '#000',
    fontSize: hp('2.5%'),
  },
  option_Container: {
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  option_Label: {
    fontSize: hp('2.5%'),
    marginVertical: hp('2%'),
    marginLeft: '10%',
    color: '#000',
  },
});

export default CustomDrawer;
