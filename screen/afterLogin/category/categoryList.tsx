import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../../service/header2';
import {useRoute, useNavigation} from '@react-navigation/native';
import Loader from '../../utils/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';

const CategoryList = (props: any) => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [list, setList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  React.useEffect(() => {
    fetchApi(route.params.ITEM);
  }, [route.params.ITEM]);

  const fetchApi = (Category: string) => {
    setShowLoader(true);
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products/category/' + Category,
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
        setShowLoader(false);
        console.log('---ERROR----->', ERROR);
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
              Price : <Text style={Styles.price}>{item.price}</Text>
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
    <View style={{flex: 1}}>
      <Header name={route.params.ITEM.toString()} />
      {showLoader ? (
        <Loader hide={showLoader} />
      ) : (
        <FlatList data={list} renderItem={_renderItem} />
      )}
    </View>
  );
};
const Styles = StyleSheet.create({
  Flat_List_Main: {
    width: '94%',
    height: 100,
    flexDirection: 'row',
    marginHorizontal: 3,
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
  price: {
    fontWeight: 'normal',
    color: '#000',
  },
  Image_Container: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
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
export default CategoryList;
