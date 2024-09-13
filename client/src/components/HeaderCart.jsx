import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {CartScreen} from '../screens/CartScreen';
import {CartContext, CartProvider} from '../context/CartContext';
import {Colors} from '../constants/Colors';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/dist/Ionicons';

const HeaderCart = ({isCart, item}) => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const handleBack = () => {
    navigation.goBack(null);
  };
  const handleCart = () => {
    navigation.navigate('CART');
    setSelected(item);
  };

  const {cartItems} = useContext(CartContext);
  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}>
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.appDrawerContainer}>
          <Image
            source={require('../assets/apps.png')}
            style={styles.appDrawerIcon}
          />
        </View>
      )}

      {isCart ? <Text style={styles.titleText}>My Cart</Text> : null}

      <TouchableOpacity onPress={handleCart} disabled={cartItems.length === 0}>
        <View style={{position: 'relative'}}>
          <Icon name="cart" size={30} color="black" />
        </View>
        <View style={styles.cart}>
          <Text style={{color: 'white', fontSize: 12}}>{cartItems.length}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCart;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: 'white',
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 28,
    width: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: '#000000',
  },
  cart: {
    position: 'absolute',
    right: -3,
    bottom: 34,
    height: 18,
    width: 18,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
