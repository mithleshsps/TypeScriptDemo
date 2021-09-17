import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import Header from '../../service/header2';
import {ProfileIcon} from '../../utils/Images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var ImagePicker = require('react-native-image-picker');
import * as Storage from '../../service/storage';

const Profile = (props: any) => {
  const lastNameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const [showPhotoOption, setShowPhotoOption] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  React.useEffect(() => {
    Storage.GetData('Email').then(value => {
      if (value != null) {
        setEmail(value);
      }
    });
  }, []);

  const takeCamera = () => {
    let options = {
      cameraType: 'back',
      selectionLimit: 1,
    };
    ImagePicker.launchCamera(options, (res: any) => {
      if (res.didCancel) {
        console.log('---Cancel----->', 'Cancel');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        console.log('--------->', res);
        setShowPhotoOption(false);
        if (res.assets != undefined) {
          setProfilePic(res.assets[0].uri);
        }
      }
    });
  };

  const openGallery = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      (res: any) => {
        console.log('res = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else {
          setShowPhotoOption(false);
          if (res.assets != undefined) {
            setProfilePic(res.assets[0].uri);
          }
        }
      },
    );
  };

  return (
    <View>
      <Header name={'Profile'} />
      <Modal animationType="slide" transparent={true} visible={showPhotoOption}>
        <View style={styles.main}>
          <View style={styles.modal_Second_Main}>
            <View style={styles.modal_Bottom_Container}>
              <TouchableOpacity onPress={() => takeCamera()}>
                <Text style={styles.take_Photo_Label}>Take Photo</Text>
              </TouchableOpacity>
              <View style={styles.modal_Line} />
              <TouchableOpacity onPress={() => openGallery()}>
                <Text style={styles.take_Photo_Label}>Open Gallery</Text>
              </TouchableOpacity>
              <View style={styles.modal_Line} />
              <TouchableOpacity
                onPress={() => setShowPhotoOption(!showPhotoOption)}>
                <Text style={styles.take_Photo_Label}>Close Dilaog</Text>
              </TouchableOpacity>
              <View style={styles.modal_Line} />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.profile_Photo_Container}
        onPress={() => setShowPhotoOption(!showPhotoOption)}>
        <Image
          style={styles.profile_Photo}
          source={profilePic != '' ? {uri: profilePic} : ProfileIcon}
        />
        <Text style={styles.email_Label}>{email}</Text>
      </TouchableOpacity>

      <View style={{width: '90%', marginHorizontal: '5%', marginTop: hp('5%')}}>
        <Text style={styles.first_Name_Label}>First Name</Text>
        <View style={styles.input_Container}>
          <TextInput
            style={styles.input}
            placeholder={'Please enter your first name'}
            onSubmitEditing={() => lastNameRef.current?.focus()}
            blurOnSubmit={false}
            returnKeyType={'next'}
          />
        </View>
        <Text style={styles.last_Name_Label}>Last Name</Text>
        <View style={styles.input_Container}>
          <TextInput
            style={styles.input}
            placeholder={'Please enter your first name'}
            ref={lastNameRef}
            onSubmitEditing={() => addressRef.current?.focus()}
            returnKeyType={'next'}
            blurOnSubmit={false}
          />
        </View>
        <Text style={styles.last_Name_Label}>Address</Text>
        <View style={styles.input_Container}>
          <TextInput
            style={styles.input}
            placeholder={'Please enter your first name'}
            ref={addressRef}
            returnKeyType={'done'}
            blurOnSubmit={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  email_Label: {
    fontSize: hp('2.5%'),
    marginTop: hp('1%'),
  },
  modal_Second_Main: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal_Bottom_Container: {
    width: '100%',
    backgroundColor: '#FFF',
  },
  take_Photo_Label: {
    fontSize: hp('2.5%'),
    color: '#000',
    padding: hp('2%'),
  },
  modal_Line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
  profile_Photo_Container: {
    alignSelf: 'center',
  },
  profile_Photo: {
    width: hp('20%'),
    height: hp('20%'),
    borderRadius: hp('10%'),
    marginTop: hp('5%'),
  },
  first_Name_Label: {
    fontSize: hp('2%'),
    marginVertical: hp('1%'),
  },
  input_Container: {
    width: '100%',
    height: hp('6%'),
    borderColor: 'gray',
    borderWidth: hp('.1%'),
  },
  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp('1%'),
  },
  last_Name_Label: {
    fontSize: hp('2%'),
    marginVertical: hp('1%'),
    marginTop: hp('3%'),
  },
});

export default Profile;
