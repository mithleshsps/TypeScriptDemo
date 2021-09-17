import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Header from '../service/header2';
import axios from 'axios';
import {validateEmail} from '../utils/Validator';
import Loader from '../utils/Loader';

const SignUp = () => {
  const lastNameRf = useRef<TextInput>(null);
  const userRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const conPassRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const [fistName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [conPass, setConPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhoneNumber] = useState<string>('');
  const [showfirstError, setShowFirstNameError] = useState<boolean>(false);
  const [showLastError, setShowLastNameError] = useState<boolean>(false);
  const [showUserNameError, setShowUserNameError] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPassError, setShowPassError] = useState<boolean>(false);
  const [showConPassError, setShowConPassword] = useState<boolean>(false);
  const [showAddressError, setShowAddressError] = useState<boolean>(false);
  const [showPhoneError, setShowPhoneError] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const submit = () => {
    if (
      !fistName &&
      !lastName &&
      !email &&
      !password &&
      !conPass &&
      !address &&
      !phone &&
      !userName
    ) {
      Alert.alert('Warning', 'All fileds are mandatory');
      setShowFirstNameError(true);
      setShowLastNameError(true);
      setShowUserNameError(true);
      setShowUserNameError(true);
      setShowEmailError(true);
      setShowPassError(true);
      setShowConPassword(true);
      setShowAddressError(true);
      setShowPhoneError(true);
    } else if (!fistName) {
      setShowFirstNameError(true);
    } else if (!lastName) {
      setShowLastNameError(true);
    } else if (!userName) {
      setShowUserNameError(true);
    } else if (!email) {
      setShowEmailError(true);
    } else if (validateEmail(email)) {
      Alert.alert('Warning', 'Please enter valid email');
    } else if (!password) {
      setShowPassError(true);
    } else if (!conPass) {
      setShowConPassword(true);
    } else if (password != conPass) {
      Alert.alert('warning', "Password and Confirm password did'n match.");
    } else if (!address) {
      setShowAddressError(true);
    } else if (!phone) {
      setShowPhoneError(true);
    } else {
      let Pars = {
        email: email,
        username: userName,
        password: password,
        name: {
          firstname: fistName,
          lastname: lastName,
        },
        address: {
          city: address,
          street: '',
          number: 0,
          zipcode: '',
          geolocation: {
            lat: '',
            long: '',
          },
        },
        phone: phone,
      };
      hitApi(Pars);
    }
  };

  const hitApi = (pars: any) => {
    setShowLoader(true);
    axios({
      method: 'POST',
      url: 'https://fakestoreapi.com/users',
      data: pars,
    })
      .then(res => {
        console.log('----res---->', res);
        setShowLoader(false);
      })
      .catch(ERROR => {
        console.log('-----ERROR---->', ERROR);
        Alert.alert('Warning', 'Api not work');
        setShowLoader(false);
      });
  };

  return (
    <View style={styles.main_Container}>
      <Header name={'Signup'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        style={styles.main_Container}>
        <ScrollView
          pointerEvents={showLoader ? 'none' : 'auto'}
          style={styles.second_Main}
          showsVerticalScrollIndicator={false}>
          {showLoader && <Loader hide={showLoader} />}
          <Text style={styles.label}>First name</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showfirstError ? 'red' : 'gray'},
            ]}>
            <TextInput
              style={styles.input}
              placeholder={'Please enter First name'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => lastNameRf.current?.focus()}
              onChangeText={txt => {
                setShowFirstNameError(false);
                setFirstName(txt.trim());
              }}
              value={fistName}
            />
          </View>
          <Text style={styles.label}>Last name</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showLastError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={lastNameRf}
              style={styles.input}
              placeholder={'Please enter Last name'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => userRef.current?.focus()}
              value={lastName}
              onChangeText={txt => {
                setShowLastNameError(false);
                setLastName(txt.trim());
              }}
            />
          </View>

          <Text style={styles.label}>User name</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showUserNameError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={userRef}
              style={styles.input}
              placeholder={'Please enter Email'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => emailRef.current?.focus()}
              onChangeText={txt => {
                setShowUserNameError(false);
                setUsername(txt.trim());
              }}
              value={userName}
            />
          </View>
          <Text style={styles.label}>Email</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showEmailError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder={'Please enter Email'}
              keyboardType={'email-address'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
              onChangeText={txt => {
                setShowEmailError(false);
                setEmail(txt.trim());
              }}
              value={email}
            />
          </View>
          <Text style={styles.label}>Password</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showPassError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder={'Please enter Password'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => conPassRef.current?.focus()}
              onChangeText={txt => {
                setShowPassError(false);
                setPassword(txt.trim());
              }}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.label}>Confirm Password</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showConPassError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={conPassRef}
              style={styles.input}
              placeholder={'Please enter Confirm Password'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => addressRef.current?.focus()}
              onChangeText={txt => {
                setShowConPassword(false);
                setConPassword(txt.trim());
              }}
              value={conPass}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.label}>Address</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showAddressError ? 'red' : 'gray'},
            ]}>
            <TextInput
              ref={addressRef}
              style={styles.input}
              placeholder={'Please enter Address'}
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => phoneRef.current?.focus()}
              onChangeText={txt => {
                setShowAddressError(false);
                setAddress(txt.trim());
              }}
              value={address}
            />
          </View>
          <Text style={styles.label}>Phone number</Text>
          <View
            style={[
              styles.input_Container,
              {borderColor: showPhoneError ? 'red' : 'gray'},
            ]}>
            <TextInput
              maxLength={10}
              ref={phoneRef}
              style={styles.input}
              placeholder={'Please enter Confirm Password'}
              keyboardType={'number-pad'}
              returnKeyType="done"
              onChangeText={txt => {
                setShowPhoneError(false);
                setPhoneNumber(txt.trim());
              }}
              value={phone}
            />
          </View>
          <TouchableOpacity
            onPress={() => submit()}
            style={styles.button_Container}>
            <Text style={styles.button_Label}>Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  main_Container: {
    flex: 1,
  },
  second_Main: {
    width: '90%',
    marginHorizontal: '5%',
  },
  label: {
    fontSize: hp('2.5%'),
    color: '#000',
    marginTop: hp('2%'),
  },
  input_Container: {
    width: '100%',
    height: hp('5.5%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: hp('1%'),
  },
  input: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
    paddingVertical: 0,
  },
  button_Container: {
    width: wp('35%'),
    height: hp('6%'),
    backgroundColor: '#207CB7',
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp('3%'),
  },
  button_Label: {
    fontSize: hp('2.5%'),
    color: '#FFFF',
  },
});

export default SignUp;
