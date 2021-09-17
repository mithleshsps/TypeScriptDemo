import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import * as Storage from '../service/storage';
import * as validation from '../service/validator';
import {useNavigation} from '@react-navigation/native';

const Login = (props: any) => {
  const navigation = useNavigation<any>();
  const passwordRef = useRef<TextInput>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showEmailError, setShowEmailError] = useState<boolean>(false);
  const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');

  const login = () => {
    Keyboard.dismiss();
    if (!email && !password) {
      setEmailError('Email is compulsory');
      setShowEmailError(true);
      setShowPasswordError(true);
    } else if (!email) {
      setEmailError('Email is compulsory');
      setShowEmailError(true);
      setShowPasswordError(false);
    } else if (!validation.emailValidation(email)) {
      setEmailError('Please enter valid email');
      setShowEmailError(true);
    } else if (!password) {
      setShowEmailError(false);
      setShowPasswordError(true);
    } else {
      Storage.SaveDate('Email', email);
      navigation.reset({
        index: 0,
        routes: [{name: 'AfterLogin'}],
      });
    }
  };

  return (
    <View style={styles.Main_Container}>
      <Text style={styles.Title_label}>TYPE SCRIPT</Text>
      <View>
        <Text style={styles.Email_Label}>Email</Text>
        <View style={styles.Edit_Text_Container}>
          <View style={styles.Icon_Container}>
            <SimpleLineIcons name="user" size={hp('3%')} color="gray" />
          </View>
          <TextInput
            style={styles.Edit_Box}
            placeholder={'Please enter email'}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={txt => {
              setEmail(txt.trim());
              setShowEmailError(false);
            }}
            returnKeyType={'next'}
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>
        {showEmailError && (
          <Text style={styles.email_Error_Label}>{emailError}</Text>
        )}
        <Text style={styles.Password_Label}>Password</Text>
        <View style={styles.Edit_Text_Container}>
          <View style={styles.Icon_Container}>
            <SimpleLineIcons name="user" size={hp('3%')} color="gray" />
          </View>
          <TextInput
            style={styles.Edit_Box}
            placeholder={'Please enter password'}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={txt => {
              setPassword(txt.trim());
              setShowPasswordError(false);
            }}
            ref={passwordRef}
            returnKeyType={'done'}
            onSubmitEditing={() => login()}
          />
        </View>
        {showPasswordError == true && (
          <Text style={styles.email_Error_Label}>Password is compulsory</Text>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              setEmail('');
              setPassword('');
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.Signup_label}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmail('');
              setPassword('');
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.Signup_label}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.Button_Container}
          onPress={() => login()}>
          <Text style={styles.Login_Label}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Main_Container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  Title_label: {
    marginVertical: hp('10%'),
    fontSize: hp('4%'),
    color: '#000',
  },
  Edit_Text_Container: {
    width: '80%',
    height: hp('7%'),
    backgroundColor: '#FFF',
    borderRadius: hp('1%'),
    borderWidth: hp('.1%'),
    flexDirection: 'row',
  },
  Icon_Container: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Edit_Box: {
    width: '80%',
    marginHorizontal: '2.5%',
    height: '100%',
  },
  Email_Label: {
    fontSize: hp('2%'),
    marginVertical: hp('1%'),
  },
  Password_Label: {
    fontSize: hp('2%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  Button_Container: {
    width: 200,
    height: hp('6%'),
    backgroundColor: '#207CB7',
    borderRadius: hp('1%'),
    marginVertical: hp('4%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Signup_label: {
    marginTop: hp('2%'),
    textDecorationLine: 'underline',
    textDecorationColor: '#207CB7',
  },
  Login_Label: {
    fontSize: hp('2%'),
    color: '#FFF',
    fontWeight: 'bold',
  },
  email_Error_Label: {
    color: 'red',
    fontSize: hp('1.5%'),
  },
});
export default Login;
