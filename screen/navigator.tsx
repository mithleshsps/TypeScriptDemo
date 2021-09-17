import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './beforeLogin/login';
import SignUp from './beforeLogin/signup';
import home from './afterLogin/home/index';
import CustomDrawer from './afterLogin/customDrawer';
import Details from './afterLogin/detail';
import Category from './afterLogin/category';
import CategoryList from './afterLogin/category/categoryList';
import ForgotPassword from './beforeLogin/forgotPassword';
import Terms from './afterLogin/profile/Terms';
import Setting from './afterLogin/profile/Setting';
import Profile from './afterLogin/profile';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Storage from './service/storage';
import splash from './splash';

const beforeLoginStack = createStackNavigator();
const afterLoginStack = createStackNavigator();
const rootStack = createStackNavigator();
const homeStack = createDrawerNavigator();

const HomeStack = () => {
  return (
    <homeStack.Navigator
      drawerContent={props => <CustomDrawer />}
      drawerStyle={{marginTop: hp('7%'), width: wp('60%')}}>
      <homeStack.Screen name="home" component={home} />
      <homeStack.Screen name="Details" component={Details} />
      <homeStack.Screen name="Category" component={Category} />
      <homeStack.Screen name="CategoryList" component={CategoryList} />
      <homeStack.Screen name="Terms" component={Terms} />
      <homeStack.Screen name="Setting" component={Setting} />
      <homeStack.Screen name="Profile" component={Profile} />
    </homeStack.Navigator>
  );
};

const AfterLogin = () => {
  return (
    <afterLoginStack.Navigator headerMode={'none'}>
      <afterLoginStack.Screen name="HomeStack" component={HomeStack} />
      <afterLoginStack.Screen name="BeforeLogin" component={BeforeLogin} />
    </afterLoginStack.Navigator>
  );
};
const BeforeLogin = () => {
  return (
    <beforeLoginStack.Navigator headerMode={'none'}>
      <beforeLoginStack.Screen name="Login" component={Login} />
      <beforeLoginStack.Screen name="SignUp" component={SignUp} />
      <beforeLoginStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <beforeLoginStack.Screen name="AfterLogin" component={AfterLogin} />
    </beforeLoginStack.Navigator>
  );
};

const Navigator = () => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(true);

  React.useEffect(() => {
    setLoader(true);
    Storage.GetData('Email').then(Value => {
      if (Value != null) {
        setEmail(Value.toString());
      }
      setLoader(false);
    });
  }, []);

  React.useLayoutEffect(() => {
    Storage.GetData('Email').then(Value => {
      console.log('-----Email---->', Value);
      if (Value != null) {
        setEmail(Value.toString());
      } else {
        setEmail('');
      }
      setLoader(false);
    });
  }, []);

  return (
    <NavigationContainer>
      {loader ? (
        <rootStack.Navigator headerMode="none">
          <rootStack.Screen name="splash" component={splash} />
        </rootStack.Navigator>
      ) : email === '' ? (
        <rootStack.Navigator headerMode="none">
          <rootStack.Screen name="BeforeLogin" component={BeforeLogin} />
        </rootStack.Navigator>
      ) : (
        <rootStack.Navigator headerMode="none">
          <rootStack.Screen name="AfterLogin" component={AfterLogin} />
        </rootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
