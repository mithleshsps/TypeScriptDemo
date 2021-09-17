import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../service/header2';
import axios from 'axios';
import Loader from '../../utils/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();
  const [list, setList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  React.useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = () => {
    setShowLoader(true);
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products/categories',
    })
      .then(res => {
        setShowLoader(false);
        if (res.status === 200) {
          setList(res.data);
        } else {
          setList([]);
        }
      })
      .catch(ERROR => {
        console.log('-----ERROR---->', ERROR);
        setShowLoader(false);
      });
  };
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <View style={{flex: 1}}>
      <Header name={'Category'} />
      {showLoader && <Loader hide={showLoader} />}
      <ScrollView horizontal contentContainerStyle={Styles.scroll_Container}>
        {list.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('CategoryList', {ITEM: item})}
              style={Styles.list_Main_Container}>
              <Text style={Styles.list_Label}>{capitalize(item)}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  scroll_Container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  list_Main_Container: {
    backgroundColor: '#207CB7',
    width: wp('48%'),
    margin: '1%',
    height: wp('48%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1%'),
  },
  list_Label: {
    fontSize: hp('2.5%'),
    color: '#FFF',
  },
});

export default Category;
