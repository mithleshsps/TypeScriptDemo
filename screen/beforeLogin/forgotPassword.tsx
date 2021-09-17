import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import Header from '../service/header2';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {validateEmail} from '../utils/Validator';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [showEmailError, setShowEmailError] = useState<boolean>(false);

  const submit = () => {
    Keyboard.dismiss();
    if (!email) {
      setShowEmailError(true);
    } else if (validateEmail(email)) {
      Alert.alert('Warning', 'Please enter valid email');
    }
  };

  return (
    <View>
      <Header name={'Forgot Password'} />
      <View style={styles.main_Container}>
        <Text style={styles.email_Label}>Email</Text>
        <View
          style={[
            styles.edit_Container,
            {borderColor: showEmailError ? 'red' : 'gray'},
          ]}>
          <TextInput
            style={styles.input}
            placeholder={'Enter registered  email'}
            onChangeText={txt => {
              setShowEmailError(false);
              setEmail(txt.trim());
            }}
            value={email}
            keyboardType={'email-address'}
            returnKeyType={'done'}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </View>
        <TouchableOpacity
          style={styles.button_Container}
          onPress={() => submit()}>
          <Text style={styles.submit_Label}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_Container: {
    width: '90%',
    marginHorizontal: '5%',
    justifyContent: 'center',
  },
  email_Label: {
    marginTop: hp('15%'),
    color: '#000',
    fontSize: hp('2%'),
  },
  edit_Container: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#FFF',
    borderRadius: hp('1%'),
    borderWidth: hp('.1%'),
    flexDirection: 'row',
  },
  input: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
  },
  button_Container: {
    width: wp('20%'),
    height: hp('6%'),
    backgroundColor: '#207CB7',
    borderRadius: hp('1%'),
    marginVertical: hp('4%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit_Label: {
    color: '#FFF',
    fontSize: hp('2.5%'),
  },
});

export default ForgotPassword;
