import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Header from '../../service/header2';
import {useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Details = (props: any) => {
  const route = useRoute<any>();
  const [quantity, setQuantity] = useState<string>('');

  React.useEffect(() => {
    setQuantity('');
    Keyboard.dismiss();
  }, [route.params.ITEM.title]);

  return (
    <View>
      <Header name={route.params.ITEM.title} />
      <View style={styles.main_Container}>
        <Image
          style={styles.image_Container}
          source={{uri: route.params.ITEM.image}}
        />
        <View style={styles.price_Main_container}>
          <Text style={styles.price_Label}>
            Price : {Math.round(route.params.ITEM.price)}
          </Text>
          <View style={styles.price_Second_Child}>
            <Text style={styles.price_Label}>Quantity</Text>
            <View style={styles.quantity_Container}>
              <TextInput
                maxLength={3}
                autoFocus={false}
                placeholder={'0'}
                style={styles.quantity_Input}
                value={quantity}
                onChangeText={txt => setQuantity(txt.replace(/[^0-9]/g, ''))}
              />
            </View>
          </View>
        </View>
        <Text numberOfLines={6} style={styles.des_Label}>
          {route.params.ITEM.description}
        </Text>
        <View style={styles.button_Container}>
          <TouchableOpacity style={styles.buy_Container}>
            <Text style={styles.buy_Label}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cart_Container}>
            <Text style={styles.cart_Label}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_Container: {
    width: '90%',
    height: '100%',
    marginHorizontal: '5%',
  },
  image_Container: {
    width: '100%',
    height: hp('40%'),
    resizeMode: 'contain',
    marginVertical: hp('1.5%'),
    backgroundColor: '#FFF',
  },
  price_Main_container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price_Second_Child: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price_Label: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  quantity_Container: {
    width: 50,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: wp('1%'),
    borderRadius: hp('.5%'),
  },
  quantity_Input: {
    width: '96%',
    marginHorizontal: '2%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  des_Label: {
    fontSize: hp('2%'),
    marginVertical: hp('2'),
  },
  button_Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buy_Container: {
    backgroundColor: '#207CB7',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
  },
  buy_Label: {
    fontSize: hp('2%'),
    color: '#FFF',
    fontWeight: 'bold',
    padding: hp('1.5%'),
  },
  cart_Container: {
    backgroundColor: '#207CB7',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('1%'),
    marginTop: hp('2%'),
  },
  cart_Label: {
    fontSize: hp('2%'),
    color: '#FFF',
    fontWeight: 'bold',
    padding: hp('1.5%'),
  },
});

export default Details;
