import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../service/header';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../utils/Loader';
import {useNavigation} from '@react-navigation/native';

// fakeApi
// https://fakestoreapi.com/
const Home = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    hitApi();
  }, []);
  const hitApi = () => {
    setShowLoader(true);
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
    })
      .then(res => {
        if (res.status === 200) {
          setShowLoader(false);
          setList(res.data);
        } else {
          setList([]);
          setShowLoader(false);
        }
      })
      .catch(ERROR => {
        console.log('----ERROR----->', ERROR);
      });
  };

  const _renderItem = ({item, index}: {item: any; index: any}) => {
    return (
      <View>
        <View style={Styles.Flat_List_Main}>
          <View style={Styles.list_First_Row}>
            <Image style={Styles.Image_Container} source={{uri: item.image}} />
          </View>
          <TouchableOpacity
            style={Styles.list_Second_Row}
            onPress={() => navigation.navigate('Details', {ITEM: item})}>
            <Text numberOfLines={2} style={Styles.Title_label}>
              {item.title}
            </Text>
            <Text style={Styles.cat_Label}>
              Category : <Text style={Styles.cat_des}>{item.category}</Text>
            </Text>
            <Text numberOfLines={2} style={Styles.cat_Label}>
              Description :{' '}
              <Text style={Styles.cat_des}>{item.description}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.list_Line} />
      </View>
    );
  };
  return (
    <View style={Styles.main}>
      <Header />
      {showLoader && <Loader hide={showLoader} />}
      <FlatList data={list} renderItem={_renderItem} />
    </View>
  );
};

const Styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  Flat_List_Main: {
    width: '98%',
    height: 100,
    flexDirection: 'row',
    marginHorizontal: 1,
    marginVertical: 2,
  },
  Title_label: {
    fontSize: wp('4%'),
    color: '#000',
  },
  cat_Label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: wp('3%'),
    marginVertical: 1,
  },
  cat_des: {
    fontWeight: 'normal',
    color: 'gray',
  },
  Image_Container: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  list_First_Row: {
    width: '30%',
    height: '100%',
  },
  list_Second_Row: {
    width: '68%',
    marginHorizontal: '1%',
    height: '100%',
  },
  list_Line: {
    width: '100%',
    height: 1,
    backgroundColor: 'gray',
  },
});

export default Home;
